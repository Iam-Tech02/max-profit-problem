function getMaxProfitPlans(totalTime) {
  const buildings = {
    T: { time: 5, earning: 1500 },
    P: { time: 4, earning: 1000 },
    C: { time: 10, earning: 3000 },
  };

  let maxProfit = 0;
  const plans = [];

  function getPermutations(arr) {
    if (arr.length === 0) return [[]];
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      const curr = arr[i];
      const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
      for (const perm of getPermutations(remaining)) {
        result.push([curr, ...perm]);
      }
    }
    return result;
  }

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

        const permutations = getPermutations(order);
        const seen = new Set();
        for (const perm of permutations) {
          const key = perm.join(",");
          if (seen.has(key)) continue;
          seen.add(key);

          let usedTime = 0;
          let profit = 0;
          for (const type of perm) {
            const { time, earning } = buildings[type];
            if (usedTime + time > totalTime) break;
            usedTime += time;
            const earningTime = totalTime - usedTime;
            profit += earningTime * earning;
          }

          if (profit > maxProfit) {
            maxProfit = profit;
            plans.length = 0;
            plans.push(perm);
          } else if (profit === maxProfit) {
            plans.push(perm);
          }
        }
      }
    }
  }

  const formattedPlans = plans.map((perm) => {
    const count = { T: 0, P: 0, C: 0 };
    perm.forEach((type) => count[type]++);
    return count;
  });

  const uniqueFormattedPlans = [];
  const seenPlans = new Set();
  for (const plan of formattedPlans) {
    const key = `${plan.T}-${plan.P}-${plan.C}`;
    if (!seenPlans.has(key)) {
      seenPlans.add(key);
      uniqueFormattedPlans.push(plan);
    }
  }

  return {
    earnings: maxProfit,
    solutions: uniqueFormattedPlans,
  };
}

const testCases = [7, 8, 13];
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
