const testDbService = require("./../database/OrderService");

async function test() {
    const res = await testDbService.findOrder("80001108220003322"); // 8000110822000322
    console.log("resss = ", res);
}

test();
