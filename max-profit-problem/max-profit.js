function getMaxProfitPlans(totalTime) {
  const buildings = {
    T: { time: 5, earning: 1500 },
    P: { time: 4, earning: 1000 },
    C: { time: 10, earning: 3000 },
  };

  let maxProfit = 0;
  const plans = [];

  for (let t = 0; t <= Math.floor(totalTime / buildings.T.time); t++) {
    for (let p = 0; p <= Math.floor(totalTime / buildings.P.time); p++) {
      for (let c = 0; c <= Math.floor(totalTime / buildings.C.time); c++) {
        const totalBuildTime =
          t * buildings.T.time + p * buildings.P.time + c * buildings.C.time;
        if (totalBuildTime > totalTime) continue;

        const order = [];

        for (let i = 0; i < t; i++) order.push("T");
        for (let i = 0; i < p; i++) order.push("P");
        for (let i = 0; i < c; i++) order.push("C");

        let usedTime = 0;
        let profit = 0;

        for (const type of order) {
          const { time, earning } = buildings[type];
          if (usedTime + time > totalTime) break;
          usedTime += time;
          const earningTime = totalTime - usedTime;
          profit += earningTime * earning;
        }

        if (profit > maxProfit) {
          maxProfit = profit;
          plans.length = 0;
          plans.push({ T: t, P: p, C: c });
        } else if (profit === maxProfit) {
          plans.push({ T: t, P: p, C: c });
        }
      }
    }
  }

  return {
    earnings: maxProfit,
    solutions: plans,
  };
}
const testCases = [7,8,13];
testCases.forEach((time) => {
  const { earnings, solutions } = getMaxProfitPlans(time);
  solutions.forEach((plan, index) => {
    console.log(`Time Unit: ${time}`);
    console.log(`Earnings: $${earnings}`);
    console.log(`Solution ${index + 1}`);
    console.log(`  → T: ${plan.T}`);
    console.log(`  → P: ${plan.P}`);
    console.log(`  → C: ${plan.C}`);
  });
});






