const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

    let assert = require('assert');
    

const driver = new webdriver.Builder()
    .forBrowser('safari')
    .build();

async function waitForElement(selector) {
    return await driver.wait(await until.elementLocated(selector), 10000)
}

async function waitForVisible(element) {
    return await driver.wait(await until.elementIsVisible(element), 100000)
}

async function waitForElementVisible(selector) {
    let element = await waitForElement(selector)
    return await waitForVisible(element)
 }

 driver.get("https://www.wikipedia.org/").then( async function() {
    driver.manage().window().maximize();

    await driver.findElement(By.id("js-link-box-en")).click();

    
    await waitForElementVisible(By.id("mp-welcome"));
    
    const text = (await driver
        .findElement(By.id("mp-welcome"))
        .getText()).toLowerCase();
      if (text && text.indexOf("welcome to wikipedia") >= 0) {
        console.log(`\n"Welcome to Wikipedia" is found!\n`);
      }

    await driver.sleep(3000)

}).catch(error => {throw error});

