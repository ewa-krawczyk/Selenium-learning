const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('safari')
    .build();

const waitForElementTimeOut = 10000

async function waitForElement(selector) {
    return await driver.wait(await until.elementLocated(selector), waitForElementTimeOut)
}

async function waitForVisible(element) {
    return await driver.wait(await until.elementIsVisible(element), waitForElementTimeOut)
}

async function waitForElementVisible(selector) {
    let element = await waitForElement(selector)
    return await waitForVisible(element)
 }

async function clickOnElement(selector, message) {
    console.log(`Looking for element to click - ${message}`)
    const element =  await waitForElementVisible(selector);
    element.click();
    console.log(`Clicked - ${message}`)
    return element
}

async function sendKeysToElement(selector, keys, message) {
    console.log(`Looking for element to send keys: "${keys}" - ${message}`)
    const element = await waitForElementVisible(selector)
    element.sendKeys(keys)
    console.log(`Keys send: "${keys}" - ${message}`)
    return element
}

async function getTextFromElement(selector, message) {
    console.log(`Text element - ${message}`)
    const element = await waitForElementVisible(selector)
    console.log(`Get Text from text element - ${message}`)
    const text = await element.getText()
    console.log(`Text: "${text}" - ${message}`)
    return text
}

module.exports = {
    driver,
    waitForElement,
    waitForVisible,
    waitForElementVisible,
    clickOnElement,
    sendKeysToElement,
    getTextFromElement
}