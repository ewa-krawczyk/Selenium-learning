const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

    let assert = require('assert');
    

    const common = require('./common.js');
    const driver = common.driver;
    const sleepValue = 0;


 driver.get("http://seleniumdemo.com/").then( async function() {
    driver.manage().window().maximize();
    let myAccount = By.xpath('//li[@id="menu-item-22"]//a');
    let myAccount2 = await common.waitForElementVisible(myAccount);
    myAccount2.click()


    let emailRegister = By.id("reg_email");
    let emailRegister2 = await common.waitForElementVisible(emailRegister);
    emailRegister2.sendKeys("test@test.com")

    let passwordRegister = By.id("reg_password");
    let passwordRegister2 = await common.waitForElementVisible(passwordRegister);
    passwordRegister2.sendKeys("test@test.com")

    

    let register = By.name("register");
    let register2 = await common.waitForElementVisible(register);
    register2.click()

    await driver.sleep(3000)

    const text = (await driver
        .findElement(By.xpath('//*[@id="page-7"]/div/section/div/div/div[1]/ul/li'))
        .getText());

      if (text && text.indexOf(" account") <= 0) {
        console.log("Test passed");
      }
      else {
          console.log("Test failed");
      }

    await driver.sleep(3000)
 
}).catch(error => {throw error});