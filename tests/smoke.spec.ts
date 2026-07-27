import { test, expect } from "@playwright/test";

const routes: { path: string; titleContains: string }[] = [
  { path: "/", titleContains: "Austin Armstrong" },
  { path: "/essays", titleContains: "Essays" },
  { path: "/now", titleContains: "Field Notes" },
  { path: "/work", titleContains: "Work With Me" },
  { path: "/projects", titleContains: "Projects" },
  { path: "/resume", titleContains: "CV" },
];

for (const { path, titleContains } of routes) {
  test(`${path} loads and has expected title`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(new RegExp(titleContains));
  });
}
