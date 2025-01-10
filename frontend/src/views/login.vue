<template>
  <v-container class="login__container">
    <v-card class="login__card">
      <Logo />
      <div class="login__header">
        <h1 class="login__header__title">Login</h1>
        <span class="login__header__subtitle"
          >Don't have an account?
          <router-link class="login__header__link" to="/register">
            Register
          </router-link>
        </span>
      </div>
      <v-form class="login__form" @submit.prevent="onLogin">
        <v-text-field
          :error-messages="getFormErrorMessage('email')"
          :hide-details="!v$.form.email.$errors.length"
          @blur="v$.form.email.$touch"
          label="Email"
          type="email"
          v-model="form.email"
        />
        <v-text-field
          :error-messages="getFormErrorMessage('password')"
          :hide-details="!v$.form.password.$errors.length"
          @blur="v$.form.password.$touch"
          label="Password"
          type="password"
          v-model="form.password"
        />
        <v-btn
          :loading="loading"
          class="login__form__button"
          color="primary"
          type="submit"
        >
          Login
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

import Logo from "../components/logo.vue";
import { userService } from "../services/user.service";

type Data = {
  error: Error | null;
  form: {
    email: string;
    password: string;
  };
  loading: boolean;
};

export default defineComponent({
  components: {
    Logo,
  },
  data() {
    return <Data>{
      error: null,
      form: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },
  methods: {
    getFormErrorMessage(field: string): string {
      return this.v$.form[field].$errors.map((e: any) => e.$message).join(", ");
    },
    async onLogin(): Promise<void> {
      this.error = null;
      this.loading = true;

      if (!(await this.v$.$validate())) {
        this.loading = false;

        return;
      }

      const loginResponse = await userService.login({
        email: this.form.email,
        password: this.form.password,
      });

      if (loginResponse.isFailure()) {
        const error = loginResponse.data;

        this.error = error;
        this.loading = false;

        this.$store.dispatch("toastModule/showToast", {
          color: "error",
          message: error.message,
          timeout: 3000,
        });

        return;
      }

      const { user } = loginResponse.data;

      this.loading = false;

      this.$router.push({ name: "Videos" });
      this.$store.dispatch("userModule/setUser", user);
    },
  },
  name: "Login",
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      form: {
        email: {
          email: helpers.withMessage("The email format is invalid.", email),
          required: helpers.withMessage("Email is required.", required),
        },
        password: {
          required: helpers.withMessage("Password is required.", required),
        },
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.login {
  &__card {
    background-color: transparent;
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 384px;
    width: 100%;
  }
  &__container {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
  }
  &__header {
    &__link {
      color: #4c61f5;
    }
    &__subtitle {
      font-size: 0.875rem;
    }
    &__title {
      font-size: 1.5rem;
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    &__button {
      font-size: 1rem;
      font-weight: 700;
      height: unset !important;
      letter-spacing: unset !important;
      padding: 15px 16px;
      text-transform: unset;
    }
  }
}
</style>
