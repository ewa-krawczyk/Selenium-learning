const webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

const common = require('./common.js');
const { getTextFromElement, driver } = common;

const sleepValue = 10;
const renderDelayValue = 1000;

const addresses = [{
    firstName: "Bartek",
    lastName: "Tester",
    street: "Zwyciestwa",
    postcode: "22-250",
    town: "Gliwice",
    phone: "00-00-000",
    country: "Poland",
    getFullAddress: function() {
      return `${this.firstName} ${this.lastName}${this.street}${this.postcode} ${this.town}`
    }
  }, {
    firstName: "Ala",
    lastName: "Kota",
    street: "Rejkjanesbaer",
    postcode: "55900",
    town: "Keflavik",
    phone: "99-99-999",
    country: "Iceland",
    getFullAddress: function() {
      return `${this.firstName} ${this.lastName}${this.street}${this.postcode} ${this.town}${this.country}`
    }
  }, {
    firstName: "Stefan",
    lastName: "Zenon",
    street: "Zwyciestwa",
    postcode: "22250",
    town: "Berlin",
    phone: "00-00-000",
    country: "Germany",
    getFullAddress: function() {
      return `${this.firstName} ${this.lastName}${this.street}${this.postcode} ${this.town}${this.country}`
    }, {
      firstName: "Alicja",
      lastName: "Asd",
      street: "Zwyciestwa",
      postcode: "22250",
      town: "Koln",
      phone: "00-00-000",
      country: "Germany",
      getFullAddress: function() {
        return `${this.firstName} ${this.lastName}${this.street}${this.postcode} ${this.town}${this.country}`
      }
  }]

async function logIn() {
  let myAccount = By.xpath('//li[@id="menu-item-22"]//a');
  await common.clickOnElement(myAccount, "Click on LOG IN menu item");

  let emailLog = By.id("username");
  await common.sendKeysToElement(emailLog, "test@test.com", "Type user email");

  let passwordLog = By.id("password");
  await common.sendKeysToElement(passwordLog, "test@test.com", "Type user password")

  let login = By.name("login");
  await common.clickOnElement(login, "Click on login button");
  await driver.sleep(sleepValue)
}

async function changeAddress(addresData)  {
  let address = By.linkText("Addresses");
  await common.clickOnElement(address, "Click on adress item")
  await driver.sleep(sleepValue)

  let edit = By.linkText("Edit");
  await common.clickOnElement(edit, "Click on edit item")
  await driver.sleep(sleepValue)

  let firstName = addresData.firstName;
  let firstNameElement = By.id("billing_first_name");
  await common.sendKeysToElement(firstNameElement, firstName, (`Type user ${firstName}`));
  await driver.sleep(sleepValue)

  let lastName = addresData.lastName;
  let lastNameElement = By.id("billing_last_name")
  await common.sendKeysToElement(lastNameElement, lastName, (`Type user ${lastName}`))
  await driver.sleep(sleepValue)

  let country = By.xpath('//*[@id="billing_country_field"]/span/span/span[1]/span/span[2]')
  await common.clickOnElement(country, "Click on country field")


  let countryName = addresData.country;
  let countryNameElement = By.xpath("/html/body/span/span/span[1]/input")
  await common.sendKeysToElement(countryNameElement, countryName, (`Country input - ${countryName}`))

  let resultListXpath = By.xpath('//ul[@id="select2-billing_country-results"]');
  await common.waitForElementVisible(resultListXpath);

  let icelandResultXpath = By.xpath(`//ul[@id="select2-billing_country-results"]//li[contains(text(), "${countryName}")]`);
  await common.clickOnElement(icelandResultXpath, (`Click on country filter result - ${countryName}`))

  let street = addresData.street;
  let streetElement = By.id("billing_address_1");
  await common.sendKeysToElement(streetElement, street, (`Street input - ${street}`));
  await driver.sleep(sleepValue)

  let postcode = addresData.postcode;
  let postcodeElement = By.id("billing_postcode");
  await common.sendKeysToElement(postcodeElement, postcode, (`Postcode input - postcode ${postcode}`));
  await driver.sleep(sleepValue)

  let town = addresData.town;
  let townElement = By.id("billing_city");
  await common.sendKeysToElement(townElement, town, (`Town input - ${town}`));
  await driver.sleep(sleepValue)

  let phone = addresData.phone;
  let phoneElement = By.id("billing_phone")
  await common.sendKeysToElement(phoneElement, phone, (`Phone input - ${phone}`));
  await driver.sleep(sleepValue)

  let save = By.name("save_address")
  await common.clickOnElement(save, "Click on save button")
}

async function checkText() {
  let textElement = By.xpath('//div[@class="woocommerce-message"]')
  const text = await common.getTextFromElement(textElement, "Looking for success message");

  if(text && text.indexOf("Address changed successfully") >= 0) {
        console.log("Test passed");
  }
  else {
          console.log("Test failed");
  }
  await driver.sleep(500)
}

async function checkData(addresData) {

  let addresses = By.linkText("Addresses");
  await common.clickOnElement(addresses, "Click on adress item")
  await driver.sleep(sleepValue)

  let textAddress = By.xpath('//*[@id="page-7"]/div/section/div/div/div/div[1]/div[1]/address');
  const textElement = await common.getTextFromElement(textAddress, "Checking text");
  console.log("Expected  address", addresData.getFullAddress())
  console.log("Actual address", textElement);

  if(textElement && textElement.indexOf(addresData.getFullAddress()) >= 0) {
    console.log("Correct")
  } else {
    console.log("Incorrect")
  }
}

driver.get("http://seleniumdemo.com/").then(async function() {
  driver.manage().window().maximize();
  await logIn();
  for (let i in addresses) {
    const addressData = addresses[i];
    console.log(addressData.firstName, addressData.lastName)
    await changeAddress(addressData);
    await checkText();
    await checkData(addressData);
  }
}).catch(error => {throw error});
