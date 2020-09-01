import dayjs from 'dayjs';

export const hello = {
  mounted() {
    console.log(
      `%c Добро пожаловать в Escrow Merchant `,
      'background:#409eff; color:#fff; padding: 5px 7px; border-radius: 3px'
    );
  },
};

export const resetForm = {
  methods: {
    resetForm(Obj) {
      Object.keys(Obj).map(key => {
        if (Obj[key] instanceof Array) Obj[key] = [];
        else Obj[key] = '';
      });
    },
  },
};

export const checkDate = {
  methods: {
    checkDate(durationDate) {
      const today = dayjs(new Date());
      const pastDate = dayjs(durationDate);
      // дата с сервера до сегодняшнего дня
      return pastDate.isBefore(today);
    },
  },
};
