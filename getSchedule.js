// getSchedule.js
const axios = require("axios");

/**
 * 获取指定演出的所有场次信息
 */
async function fetchSchedules(prodId) {
  try {
    // 这个 API 是 melon-ticket 的内部接口，prodId 就是演出ID
    const url = `https://ticket.melon.com/api/product/schedule.json?prodId=211740`;

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
      },
    });

    if (!data?.data?.scheduleList) {
      console.error("未找到 schedule 信息，请确认 prodId 是否正确");
      return;
    }

    console.log(`🎫 演出 prodId=${prodId} 的场次：`);
    data.data.scheduleList.forEach((schedule) => {
      console.log(
        `日期: ${schedule.perfDay} (${schedule.perfTime})  scheduleId: ${schedule.scheduleId}`
      );
    });
  } catch (err) {
    console.error("请求失败：", err.message);
  }
}

/**
 * 获取某场次的座位信息
 */
async function fetchSeats(scheduleId) {
  try {
    const url = `https://ticket.melon.com/api/product/seat.json?scheduleId=${scheduleId}`;
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
      },
    });

    if (!data?.data?.seatList) {
      console.error("未找到 seat 信息，请确认 scheduleId 是否正确");
      return;
    }

    console.log(`🪑 scheduleId=${scheduleId} 的座位：`);
    data.data.seatList.forEach((seat) => {
      console.log(`seatId: ${seat.seatGradeId}  名称: ${seat.seatGradeName}`);
    });
  } catch (err) {
    console.error("请求失败：", err.message);
  }
}

// ======= 使用示例 =======
// 先拉取某演出的所有场次
fetchSchedules(211740).then(() => {
  // 例如：找到 scheduleId=123456 之后，再查座位
  // fetchSeats(123456);
});
