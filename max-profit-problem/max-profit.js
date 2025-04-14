function getMaxProfitPlansDP(totalTime) {
  const buildings = {
    T: { time: 5, earning: 1500 },
    P: { time: 4, earning: 1000 },
    C: { time: 10, earning: 3000 }, 
  };

  const dp = Array(totalTime + 1).fill(null).map(() => []);
  dp[0] = [{ T: 0, P: 0, C: 0, earnings: 0 }];

  let maxEarnings = 0;

  for (let t = 0; t <= totalTime; t++) {
    for (const plan of dp[t]) {
      for (const b in buildings) {
        const { time: buildTime, earning } = buildings[b];
        const endTime = t + buildTime;

        if (endTime <= totalTime) {
          const remaining = totalTime - endTime;
          const newEarning = plan.earnings + earning * remaining;

          const newPlan = {
            T: plan.T,
            P: plan.P,
            C: plan.C,
            earnings: newEarning,
          };
          newPlan[b]++;
          if (newPlan.earnings > maxEarnings) {
            dp[endTime] = [newPlan];
            maxEarnings = newPlan.earnings;
          } else if (newPlan.earnings === maxEarnings) {
            dp[endTime].push(newPlan);
          }
        }
      }
    }
  }

  const allPlans = [];
  for (const plans of dp) {
    for (const plan of plans) {
      if (plan.earnings === maxEarnings) {
        allPlans.push(plan);
      }
    }
  }

  return {
    earnings: maxEarnings,
    solutions: allPlans.map(({ T, P, C }) => ({ T, P, C })),
  };
}


[7, 8, 13, 49].forEach((time) => {
  const { earnings, solutions } = getMaxProfitPlansDP(time);
  console.log(`\nTime Unit: ${time}`);
  console.log(`Earnings: $${earnings}`);
  console.log(`Solutions:`);
  solutions.forEach((plan, i) => {
    console.log(` ${i + 1}. T: ${plan.T} P: ${plan.P} C: ${plan.C}`);
  });
});
