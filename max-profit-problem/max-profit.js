function getMaxProfitPlan(totalTime) {
    const buildings = {
      T: { time: 5, earning: 1500 },
      P: { time: 4, earning: 1000 },
      C: { time: 10, earning: 3000 },
    };
  
    let maxProfit = 0;
    let plan = { T: 0, P: 0, C: 0 };
  
    for (let t = 0; t <= Math.floor(totalTime / buildings.T.time); t++) {
      for (let p = 0; p <= Math.floor(totalTime / buildings.P.time); p++) {
        for (let c = 0; c <= Math.floor(totalTime / buildings.C.time); c++) {
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
            plan = { T: t, P: p, C: c };
          }
        }
      }
    }
  
    return {
      plan: plan,
      earnings: maxProfit,
    };
  }
  
  const testCases = [7, 8, 13];
  testCases.forEach((time) => {
    const { plan, earnings } = getMaxProfitPlan(time);
    console.log(`Time Unit: ${time}`);
    console.log(`Earnings: $${earnings}`);
    console.log(`Solution → T: ${plan.T} P: ${plan.P} C: ${plan.C}`);
  });
  