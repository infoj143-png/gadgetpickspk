from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        # Launch browser in headless mode
        browser = p.chromium.launch(headless=True)

        # Desktop viewport context
        desktop_context = browser.new_context(viewport={"width": 1280, "height": 1000})
        page = desktop_context.new_page()

        print("Navigating to home page (Desktop)...")
        page.goto("http://localhost:5173/")
        page.wait_for_selector("text=Trending Products", timeout=15000)

        print("Taking Desktop Home page screenshot...")
        page.screenshot(path="home_page_desktop.png", full_page=True)

        # Check if the text "sold" is visible
        sold_elements = page.get_by_text("sold", exact=False)
        print(f"Found 'sold' texts on home page: {sold_elements.count()}")

        # Navigate to Product Detail page
        print("Navigating to product detail page (Desktop)...")
        page.goto("http://localhost:5173/products/kd-01")
        page.wait_for_selector("text=Technical Specifications", timeout=15000)

        print("Taking Desktop Product details screenshot...")
        page.screenshot(path="product_detail_desktop.png", full_page=True)

        # Mobile viewport context
        mobile_context = browser.new_context(
            viewport={"width": 375, "height": 812},
            is_mobile=True,
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
        )
        mobile_page = mobile_context.new_page()

        print("Navigating to home page (Mobile)...")
        mobile_page.goto("http://localhost:5173/")
        mobile_page.wait_for_selector("text=Trending Products", timeout=15000)

        print("Taking Mobile Home page screenshot...")
        mobile_page.screenshot(path="home_page_mobile.png", full_page=True)

        print("Navigating to product detail page (Mobile)...")
        mobile_page.goto("http://localhost:5173/products/kd-01")
        mobile_page.wait_for_selector("text=Technical Specifications", timeout=15000)

        print("Taking Mobile Product details screenshot...")
        mobile_page.screenshot(path="product_detail_mobile.png", full_page=True)

        browser.close()
        print("All verification steps completed successfully!")

if __name__ == "__main__":
    main()
