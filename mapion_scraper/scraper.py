import os
import time
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
import csv

def scrape_mapion():
    # ChromeDriver のオプションを設定
    options = Options()
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    # WebDriver を初期化
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    
    urls = [
        "https://www.mapion.co.jp/phonebook/M02005CM07/",
        "https://www.mapion.co.jp/phonebook/M02005CM07/2.html",
        "https://www.mapion.co.jp/phonebook/M02005CM07/3.html",
        "https://www.mapion.co.jp/phonebook/M02005CM07/4.html",
        "https://www.mapion.co.jp/phonebook/M02005CM07/5.html",
        "https://www.mapion.co.jp/phonebook/M02005CM07/6.html",
        "https://www.mapion.co.jp/phonebook/M02005CM07/7.html",
        "https://www.mapion.co.jp/phonebook/M02005CM07/8.html",
        "https://www.mapion.co.jp/phonebook/M02005CM07/9.html",
        "https://www.mapion.co.jp/phonebook/M02005CM07/10.html",
        "https://www.mapion.co.jp/phonebook/M02005CM07/11.html",
        "https://www.mapion.co.jp/phonebook/M02005CM07/12.html",
    ]
    
    output_file = "output/shops.csv"
    with open(output_file, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["店舗名", "住所"])

        for url in urls:
            driver.get(url)
            time.sleep(2)  # ページ読み込みを待機

            for i in range(2, 102):  # tr[2] から tr[101] まで
                try:
                    shop_name_xpath = f"/html/body/div[1]/div[1]/div[1]/section[1]/table[1]/tbody/tr[{i}]/th/a"
                    address_xpath = f"/html/body/div[1]/div[1]/div[1]/section[1]/table[1]/tbody/tr[{i}]/td[1]"
                    
                    shop_name = driver.find_element(By.XPATH, shop_name_xpath).text
                    address = driver.find_element(By.XPATH, address_xpath).text
                    
                    writer.writerow([shop_name, address])
                except Exception as e:
                    print(f"Error scraping row {i} on {url}: {e}")
    
    driver.quit()

if __name__ == "__main__":
    scrape_mapion()