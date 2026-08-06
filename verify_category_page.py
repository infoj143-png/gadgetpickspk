from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        desktop_context = browser.new_context(viewport={"width": 1280, "height": 1000})
        page = desktop_context.new_page()

        print("Testing Kitchen & Dining Category Page (Desktop)...")
        page.goto("http://localhost:5173/category/kitchen-dining")
        page.wait_for_selector("text=Best Kitchen & Dining Gadgets in Pakistan", timeout=15000)

        # Check for description
        desc_element = page.locator("text=Transform your culinary experiences")
        print(f"Description element count: {desc_element.count()}")

        # Check for product card
        product_elements = page.locator("text=Slique Portable Electric USB Smoothie")
        print(f"Product Slique count on category page: {product_elements.count()}")

        # Check for Buying Guide
        guide_elements = page.locator("text=Smart Kitchen & Dining Buyer's Checklist")
        print(f"Buying Guide header count: {guide_elements.count()}")

        # Check for FAQ
        faq_elements = page.locator("text=Frequently Asked Questions")
        print(f"FAQ header count: {faq_elements.count()}")

        print("Taking Category Page Desktop Screenshot...")
        page.screenshot(path="category_kitchen_dining_desktop.png", full_page=True)

        # Mobile viewport context
        mobile_context = browser.new_context(
            viewport={"width": 375, "height": 812},
            is_mobile=True,
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
        )
        mobile_page = mobile_context.new_page()

        print("Testing Pet Supplies Category Page (Mobile)...")
        mobile_page.goto("http://localhost:5173/category/pet-supplies")
        mobile_page.wait_for_selector("text=Best Pet Supplies & Smart Grooming Gear in Pakistan", timeout=15000)

        # Check for product card
        mobile_product = mobile_page.locator("text=Catit Flower Automatic Pet Water Fountain")
        print(f"Pet Product count on mobile: {mobile_product.count()}")

        print("Taking Category Page Mobile Screenshot...")
        mobile_page.screenshot(path="category_pet_supplies_mobile.png", full_page=True)

        browser.close()
        print("Category page E2E verification completed successfully!")

if __name__ == "__main__":
    main()
