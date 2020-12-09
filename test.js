const { INTERNAL_COMPUTE_OFFSET_SCRIPT } = require('selenium-webdriver/lib/input');

const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
    
    const common = require('./common.js');
    const driver = common.driver;
    
    const sleepValue = 0;

driver.get("http://www.kurs-selenium.pl/demo/").then( async function() {
    driver.manage().window().maximize();
    let selector = By.xpath('//span[@class="select2-chosen"]')
    let element = await common.waitForElementVisible(selector);
    element.click()

    let selector2 = By.xpath("/html/body/div[17]/div/input");
    let element2 = await common.waitForElement(selector2)
    element2.sendKeys('Dubai')

    // await driver.sleep(10000)

    let selector3 = By.xpath("/html/body/div[17]/ul/li/ul/li/div/span");
    let element3 = await common.waitForElement(selector3);
    element3.click()

    let selector4 = By.name("checkin");
    let element4 = await common.waitForElement(selector4)
    element4.sendKeys('06/11/2020')

    let selector5 = By.name("checkout");
    let element5 = await common.waitForElement(selector5)
    element5.sendKeys('08/11/2020')

    let selector6 = By.id("travellersInput");
    let element6 = await common.waitForElement(selector6)
    element6.click()

    let selector7 = By.id("adultInput");
    let element7 = await common.waitForElement(selector7)
    element7.clear()

    let selector8 = By.id("adultInput");
    let element8 = await common.waitForElement(selector8)
    element8.sendKeys("4")

    let selector9 = By.id("childInput");
    let element9 = await common.waitForElement(selector9)
    element9.clear()

    let selector10 = By.id("childInput");
    let element10 = await common.waitForElement(selector10)
    element10.sendKeys("2")

    let selector11 = By.xpath("//button[text()=' Search']");
    let element11 = await common.waitForElement(selector11);
    element11.click()

    let hotelsSelector = By.xpath("//h4[contains(@class, 'list_title')]//b");
    await waitForElement(hotelsSelector);
    
    let hotelList = await driver.findElements(hotelsSelector);
    hotelList.forEach(async function(hotel) {
        console.log(await hotel.getText())
    }) 

    let pricesSelector = By.xpath("//div[contains(@class, 'price_tab')]//b");
    await waitForElement(pricesSelector);
    
    let priceList = await driver.findElements(pricesSelector);
    priceList.forEach(async function(price) {
        console.log(await price.getText())
    }) 
    
    await driver.sleep(2000)
    




    






}).catch(error => {throw error});