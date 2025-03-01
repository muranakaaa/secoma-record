import { fetchArea } from "@/lib/fetchArea";
import { fetchAreas } from "@/lib/fetchAreas";
import { fetchShops } from "@/lib/fetchShops";
import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

const BASE_URL = "https://secoma-record.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "/",
    "/sign_in",
    "/sign_up",
    "/privacy-policy",
    "/terms",
  ];

  const areas = await fetchAreas();

  const areaPages = await Promise.all(
    areas
      .filter((area: { id: string; }) => area.id)
      .map(async (area: { id: string; }) => {
        const areaId = area.id as string;

        const areaData = await fetchArea(areaId);
        const subAreaPages = await Promise.all(
          areaData.sub_areas.map(async (subArea: { id: string; }) => {
            const subAreaId = subArea.id as string;
            const shopPages = await fetchShops(areaId, subAreaId);

            return [
              `${BASE_URL}/${areaId}/${subAreaId}`,
              ...shopPages.shops.map((shop: { id: string; }) => `${BASE_URL}/${areaId}/${subAreaId}/${shop.id as string}`),
            ];
          })
        );

        return [`${BASE_URL}/${areaId}`, ...subAreaPages.flat()];
      })
  );

  const urls: MetadataRoute.Sitemap = [
    ...staticPages.map((path) => ({ url: `${BASE_URL}${path}`, lastModified: new Date().toISOString() })),
    ...areaPages.flat().map((path) => ({ url: path, lastModified: new Date().toISOString() })),
  ];

  return urls;
}
