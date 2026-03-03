
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function verifyFix() {
    try {
        console.log("Starting verification...");
        
        // 1. Register/Login User
        const email = `testuser_verify_${Date.now()}@example.com`;
        const password = 'password123';
        const name = 'Verify User';

        console.log(`Registering user: ${email}`);
        let registerRes = await axios.post(`${BASE_URL}/api/user/register`, { name, email, password });
        let token = registerRes.data.token;

        if (!registerRes.data.success) {
             console.log("User might exist, trying login...");
             const loginRes = await axios.post(`${BASE_URL}/api/user/login`, { email, password });
             token = loginRes.data.token;
        }

        if (!token) {
            console.error("Failed to get token");
            process.exit(1);
        }
        console.log("Got token.");

        // 2. Add Item to Cart
        const itemId = "verify_product_" + Date.now();
        const size = "L";
        const quantity = 3;

        console.log(`Adding item to cart...`);
        await axios.post(`${BASE_URL}/api/cart/add`, 
            { itemId, size, quantity },
            { headers: { token } }
        );
        console.log("Item added.");

        // 3. Simulate Logout (Frontend clears state) - No backend action needed
        console.log("Simulating logout (frontend state cleared)...");

        // 4. Simulate Login (Get Token) and immediately Fetch Cart
        // This mimics the new code in ShopContext.jsx: getUserCart(token)
        console.log("Simulating login and fetching cart...");
        
        const getRes = await axios.post(`${BASE_URL}/api/cart/get`, {}, { headers: { token } });
        const cartData = getRes.data.cartData;
        
        console.log("Cart data retrieved:", JSON.stringify(cartData, null, 2));

        if (cartData && cartData[itemId] && cartData[itemId][size] === quantity) {
            console.log("VERIFICATION SUCCESS: Cart data persisted and retrieved.");
        } else {
            console.error("VERIFICATION FAILURE: Cart data missing.");
            process.exit(1);
        }

    } catch (error) {
        console.error("Error:", error.message);
        if (error.response) console.error("Response data:", error.response.data);
        process.exit(1);
    }
}

verifyFix();
