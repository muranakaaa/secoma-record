require "net/http"
require "json"

class Shop < ApplicationRecord
  has_many :visits, dependent: :destroy

  AREA_MAPPING = {
    "札幌" => "sapporo",
    "函館・大沼・松前" => "hakodate-onuma-matsumae",
    "小樽・キロロ・積丹" => "otaru-kiroro-shakotan",
    "旭川・層雲峡" => "asahikawa-sounkyo",
    "洞爺・登別・苫小牧" => "toya-noboribetsu-tomakomai",
    "釧路・阿寒・根室・川湯・屈斜路" => "kushiro-akan-nemuro-kawayu-kussharo",
    "帯広・十勝" => "obihiro-tokachi",
    "網走・北見・知床" => "abashiri-kitami-shiretoko",
    "石狩・空知・千歳" => "ishikari-sorachi-chitose",
    "稚内・留萌" => "wakkanai-rumoi",
    "富良野・美瑛・トマム" => "furano-biei-tomamu",
    "離島（利尻・礼文・天売・焼尻）" => "ritou-rishiri-rebun-teuri-yagishiri",
    "ニセコ・ルスツ" => "niseko-rusutsu",
    "日高・えりも" => "hidaka-erimo",
    "本州" => "honshu",
    "中央区" => "chuou-ku",
    "北区" => "kita-ku",
    "東区" => "higashi-ku",
    "白石区" => "shiroishi-ku",
    "豊平区" => "toyohira-ku",
    "南区" => "minami-ku",
    "西区" => "nishi-ku",
    "厚別区" => "atsubetsu-ku",
    "手稲区" => "teine-ku",
    "清田区" => "kiyota-ku",
    "函館市" => "hakodate-shi",
    "小樽市" => "otaru-shi",
    "旭川市" => "asahikawa-shi",
    "室蘭市" => "muroran-shi",
    "釧路市" => "kushiro-shi",
    "帯広市" => "obihiro-shi",
    "北見市" => "kitami-shi",
    "夕張市" => "yubari-shi",
    "岩見沢市" => "iwamizawa-shi",
    "網走市" => "abashiri-shi",
    "留萌市" => "rumoi-shi",
    "苫小牧市" => "tomakomai-shi",
    "稚内市" => "wakkanai-shi",
    "美唄市" => "bibai-shi",
    "芦別市" => "ashibetsu-shi",
    "江別市" => "ebetsu-shi",
    "赤平市" => "akabira-shi",
    "紋別市" => "mombetsu-shi",
    "士別市" => "shibetsu-shi",
    "名寄市" => "nayoro-shi",
    "三笠市" => "mikasa-shi",
    "根室市" => "nemuro-shi",
    "千歳市" => "chitose-shi",
    "滝川市" => "takikawa-shi",
    "砂川市" => "sunagawa-shi",
    "歌志内市" => "utashinai-shi",
    "深川市" => "fukagawa-shi",
    "富良野市" => "furano-shi",
    "登別市" => "noboribetsu-shi",
    "恵庭市" => "eniwa-shi",
    "伊達市" => "date-shi",
    "北広島市" => "kitahiroshima-shi",
    "石狩市" => "ishikari-shi",
    "北斗市" => "hokuto-shi",
    "当別町" => "tobetsu-cho",
    "新篠津村" => "shinshiotsu-mura",
    "松前町" => "matsumae-cho",
    "福島町" => "fukushima-cho",
    "知内町" => "shiriuchi-cho",
    "木古内町" => "kikonai-cho",
    "七飯町" => "nanae-cho",
    "鹿部町" => "shikabe-cho",
    "森町" => "mori-cho",
    "八雲町" => "yakumo-cho",
    "長万部町" => "oshamambe-cho",
    "江差町" => "esashi-cho",
    "上ノ国町" => "kaminokuni-cho",
    "厚沢部町" => "assabu-cho",
    "乙部町" => "otobe-cho",
    "奥尻町" => "okushiri-cho",
    "今金町" => "imakane-cho",
    "せたな町" => "setana-cho",
    "島牧村" => "shimamaki-mura",
    "寿都町" => "suttsu-cho",
    "黒松内町" => "kuromatsunai-cho",
    "蘭越町" => "rankoshi-cho",
    "ニセコ町" => "niseko-cho",
    "真狩村" => "makari-mura",
    "留寿都村" => "rusutsu-mura",
    "喜茂別町" => "kimobetsu-cho",
    "京極町" => "kyogoku-cho",
    "倶知安町" => "kutchan-cho",
    "共和町" => "kyowa-cho",
    "岩内町" => "iwane-cho",
    "泊村" => "tomari-mura",
    "積丹町" => "shakotan-cho",
    "古平町" => "furubira-cho",
    "仁木町" => "niki-cho",
    "余市町" => "yoichi-cho",
    "赤井川村" => "akaigawa-mura",
    "南幌町" => "nanporo-cho",
    "奈井江町" => "naie-cho",
    "上砂川町" => "kamisunagawa-cho",
    "由仁町" => "yuni-cho",
    "長沼町" => "naganuma-cho",
    "栗山町" => "kuriyama-cho",
    "新十津川町" => "shintotsukawa-cho",
    "妹背牛町" => "moseushi-cho",
    "秩父別町" => "chippubetsu-cho",
    "雨竜町" => "uryu-cho",
    "北竜町" => "hokuryu-cho",
    "沼田町" => "numata-cho",
    "鷹栖町" => "takasumi-cho",
    "東神楽町" => "higashikagura-cho",
    "当麻町" => "touma-cho",
    "比布町" => "pippu-cho",
    "愛別町" => "aibetsu-cho",
    "上川町" => "kamukawa-cho",
    "東川町" => "higashikawa-cho",
    "美瑛町" => "biei-cho",
    "上富良野町" => "kamifurano-cho",
    "中富良野町" => "nakafurano-cho",
    "南富良野町" => "minamifurano-cho",
    "和寒町" => "wasamu-cho",
    "剣淵町" => "kenbuchi-cho",
    "下川町" => "shimokawa-cho",
    "美深町" => "bifuka-cho",
    "音威子府村" => "otoineppu-mura",
    "中川町" => "nakagawa-cho",
    "増毛町" => "mashike-cho",
    "小平町" => "obira-cho",
    "苫前町" => "tomamae-cho",
    "羽幌町" => "haboro-cho",
    "初山別村" => "shosanbetsu-mura",
    "遠別町" => "embetsu-cho",
    "天塩町" => "teshio-cho",
    "猿払村" => "sarufutsu-mura",
    "浜頓別町" => "hamatombetsu-cho",
    "中頓別町" => "nakatombetsu-cho",
    "枝幸町" => "esashi-cho",
    "豊富町" => "toyotomi-cho",
    "礼文町" => "rebun-cho",
    "利尻町" => "rishiri-cho",
    "利尻富士町" => "rishirifuji-cho",
    "幌延町" => "horonobe-cho",
    "美幌町" => "bihoro-cho",
    "津別町" => "tsubetsu-cho",
    "斜里町" => "shari-cho",
    "清里町" => "kiyosato-cho",
    "清水町" => "shimizu-cho",
    "訓子府町" => "kunneppu-cho",
    "置戸町" => "oketo-cho",
    "佐呂間町" => "saroma-cho",
    "遠軽町" => "engaru-cho",
    "湧別町" => "yubetsu-cho",
    "滝上町" => "takinoue-cho",
    "興部町" => "okoppe-cho",
    "西興部村" => "nishiokoppe-mura",
    "雄武町" => "oumu-cho",
    "大空町" => "ozora-cho",
    "豊浦町" => "toyoura-cho",
    "壮瞥町" => "sobetsu-cho",
    "白老町" => "shiraoi-cho",
    "厚真町" => "atsuma-cho",
    "洞爺湖町" => "toyako-cho",
    "安平町" => "abira-cho",
    "むかわ町" => "mukawa-cho",
    "日高町" => "hidaka-cho",
    "平取町" => "biratori-cho",
    "新冠町" => "niikappu-cho",
    "浦河町" => "urakawa-cho",
    "様似町" => "samani-cho",
    "えりも町" => "erimo-cho",
    "新ひだか町" => "shinhidaka-cho",
    "音更町" => "otofuke-cho",
    "士幌町" => "shihoro-cho",
    "鹿追町" => "shikaoi-cho",
    "新得町" => "shintoku-cho",
    "芽室町" => "memuro-cho",
    "中札内村" => "nakasatsunai-mura",
    "更別村" => "sarabetsu-mura",
    "大樹町" => "taiki-cho",
    "広尾町" => "hiroo-cho",
    "幕別町" => "makubetsu-cho",
    "池田町" => "ikeda-cho",
    "豊頃町" => "toyokoro-cho",
    "本別町" => "hombetsu-cho",
    "足寄町" => "ashoro-cho",
    "陸別町" => "rikubetsu-cho",
    "浦幌町" => "urahoro-cho",
    "釧路町" => "kushiro-cho",
    "厚岸町" => "akkeshi-cho",
    "浜中町" => "hamanaka-cho",
    "標茶町" => "shibecha-cho",
    "弟子屈町" => "teshikaga-cho",
    "鶴居村" => "tsurui-mura",
    "白糠町" => "shiranuka-cho",
    "別海町" => "betsukai-cho",
    "中標津町" => "nakashibetsu-cho",
    "標津町" => "shibetsu-cho",
    "羅臼町" => "rausu-cho",
    "茨城県" => "ibaraki-ken",
    "埼玉県" => "saitama-ken"
  }

  def self.to_romaji(text)
    AREA_MAPPING[text] || text.to_s.parameterize
  end

  before_save :set_romaji_values

  validates :area_romaji, presence: true, if: -> { area.present? }
  validates :sub_area_romaji, presence: true, if: -> { sub_area.present? }

  private

  def set_romaji_values
    self.area_romaji = self.class.to_romaji(area) if area.present?
    self.sub_area_romaji = self.class.to_romaji(sub_area) if sub_area.present?
  end

  def fetch_google_places_data
    return unless address.present?

    api_key = ENV["GOOGLE_API_KEY"]

    find_place_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
    find_place_uri = URI(find_place_url)
    find_place_uri.query = URI.encode_www_form({
      input: address,
      inputtype: "textquery",
      fields: "place_id",
      key: api_key
    })

    find_place_response = Net::HTTP.get(find_place_uri)
    find_place_data = JSON.parse(find_place_response)

    if find_place_data["status"] != "OK" || find_place_data["candidates"].empty?
      Rails.logger.error("Google Find Place API Error: #{find_place_data['status']}")
      return
    end

    place_id = find_place_data["candidates"].first["place_id"]

    place_details_url = "https://maps.googleapis.com/maps/api/place/details/json"
    place_details_uri = URI(place_details_url)
    place_details_uri.query = URI.encode_www_form({
      place_id: place_id,
      key: api_key
    })

    place_details_response = Net::HTTP.get(place_details_uri)
    place_details_data = JSON.parse(place_details_response)

    if place_details_data["status"] == "OK"
      result = place_details_data["result"]
      self.latitude = result.dig("geometry", "location", "lat")
      self.longitude = result.dig("geometry", "location", "lng")
      save!
    else
      Rails.logger.error("Google Place Details API Error: #{place_details_data['status']}")
    end
  end
end
