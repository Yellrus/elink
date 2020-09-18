<template>
  <div class="add-template">
    <div class="detail">
      <div class="detail__body">
        <span class="detail__title">Название</span>
        <h2 class="detail__heading">{{ currentContract.Name }}</h2>
        <span class="detail__title">Описание</span>
        <p class="detail__desc">
          {{ currentContract.Description | uppercaseFirst }}
        </p>
        <span class="detail__title">Стоимость</span>
        <div class="detail__amount">
          {{ currentContract.Amount | toThousandFilter }}
          <span class="detail__Currency">₽</span>
        </div>
      </div>
    </div>

    <el-form
      ref="addTemplateContract"
      :model="model"
      :rules="rules"
      label-position="top"
      class="form-add-template"
      label-width="120px"
    >
      <el-row>
        <el-col type="flex" :span="24">
          <el-form-item label="Название шаблона" prop="name">
            <el-input
              v-model="model.name"
              maxlength="80"
              show-word-limit
              placeholder="Введите название шаблона..."
            />
          </el-form-item>
        </el-col>
      </el-row>

      <div class="page-action__btn-actions">
        <el-button type="primary" @click="onSubmit('addTemplateContract')"
          >Создать шаблон</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'FormAddContractTemplate',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    currentContract: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    model: {
      name: '',
    },
    rules: {
      name: [
        {
          required: true,
          message: 'Вам нужно заполнить имя',
          trigger: 'blur',
        },
        {
          min: 3,
          max: 80,
          message: 'Кол-во символов от 3 до 80',
          trigger: 'blur',
        },
      ],
    },
  }),
  computed: {
    ...mapState({
      device: state => state.app.device,
    }),
  },

  methods: {
    ...mapActions('contract', ['createTemplate']),

    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        const data = {
          name: this.model.name,
          contractId: this.currentContract.Id,
        };

        this.$emit('submit', data);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/detail.scss';
.detail {
  &__desc {
    margin-bottom: 14px;
  }
  &__amount {
    font-size: 19px;
    font-weight: 500;
    margin-top: -3px;
  }
}

.form-add-template {
  padding: 17px;
}

.add-template {
  margin: 0 -10px;
}
</style>
