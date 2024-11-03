const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { email, password, incorrectEmail, incorrectPassword } = require("../user.js");

test("Successfull authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId('login-submit-btn').click();
  await expect(page.locator("h2")).toHaveText("Моё обучение");
  await page.screenshot({ path: "screenshotSuccessful.png", fullPage: true });
});

test("Failed authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(incorrectEmail);
  await page.getByPlaceholder("Пароль").fill(incorrectPassword);
  await page.getByTestId("login-submit-btn").click();
  await expect(page.locator("text=Вы ввели неправильно логин или пароль")).toBeVisible();
  await page.screenshot({ path: "screenshotFailed.png", fullPage: true });
});


