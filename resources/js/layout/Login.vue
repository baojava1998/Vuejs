<template>
    <div
        class="
          auth-wrapper
          d-flex
          no-block
          justify-content-center
          align-items-center
          bg-dark
        "
        style="height: 100vh;"
    >
        <div class="auth-box bg-dark border-top border-secondary">
            <div v-for="(errorArray, idx) in errors" :key="idx">
                <div v-for="(allErrors, idx) in errorArray" :key="idx">
                    <span class="text-danger">{{ allErrors}} </span>
                </div>
            </div>
            <div id="loginform">
                <div class="text-center pt-3 pb-3">
              <span class="db"
              ><img src="/template/assets/images/logo.png" alt="logo"
              /></span>
                </div>
                <!-- Form -->
                <form
                    class="form-horizontal mt-3"
                    id="loginform"
                    @submit.prevent="authenticate"
                >
                    <div class="row pb-4">
                        <div class="col-12">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                      <span
                          class="input-group-text bg-success text-white h-100"
                          id="basic-addon1"
                      ><i class="mdi mdi-account fs-4"></i
                      ></span>
                                </div>
                                <input
                                    type="text"
                                    class="form-control form-control-lg"
                                    name="email"
                                    placeholder="Email"
                                    aria-label="Email"
                                    aria-describedby="basic-addon1"
                                    v-model="loginData.email"/>
                            </div>
                            <FormError v-if="errors.email" :errors="errors.email"/>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                      <span
                          class="input-group-text bg-warning text-white h-100"
                          id="basic-addon2"
                      ><i class="mdi mdi-lock fs-4"></i
                      ></span>
                                </div>
                                <input
                                    type="password"
                                    class="form-control form-control-lg"
                                    name="password"
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="basic-addon1"
                                    v-model="loginData.password"
                                />
                            </div>
                            <FormError v-if="errors.password" :errors="errors.password"/>
                        </div>
                    </div>
                    <div class="row border-top border-secondary">
                        <div class="col-12">
                            <div class="form-group">
                                <div class="pt-3">
                                    <button
                                        class="btn btn-info"
                                        id="to-recover"
                                        type="button"
                                    >
                                        <i class="mdi mdi-lock fs-4 me-1"></i> Lost password?
                                    </button>
                                    <button
                                        class="btn btn-success float-end text-white"
                                        type="submit"
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import FormError from '../components/FormError';

import { login } from '../helpers/auth';

export default {
    name: 'Login',
    data() {
        return {
            loginData: {
                email: '',
                password: '',
            },
            type: 'login',
            errors: []
        }
    },
    components: {
        FormError
    },
    methods: {
        authenticate() {
            this.$store.dispatch("LOGIN");

            login(this.$data.loginData)
                .then(res => {
                    this.$store.commit("LOGIN_SUCCESS", res);
                    this.$router.push({name: 'home'});
                })
                .catch(err => {
                    this.$store.commit("LOGIN_FAILED", {err})
                    this.errors = err
                })
        },
    },
    // computed: {
    //     authError() {
    //         return this.$store.getters.AUTH_ERROR;
    //     }
    // }
}
// export default {
//     data() {
//         return {
//             loginData: {
//                 'email': '',
//                 'password': ''
//             },
//             errors: []
//         }
//     },
//     components: {
//         FormError
//     },
//     methods: {
//         login() {
//             this.axios
//                 .post('/api/login', this.loginData)
//                 .then(response => {
//                     console.log(response)
//                     this.$router.push({ name: 'home' })
//                 })
//                 .catch(err => {
//                     this.errors = err.response.data.errors
//                 })
//                 .finally(() => this.loading = false)
//         },
//         ...mapMutations(["setUser", "setToken"]),
//         async submit(e) {
//             const form = new FormData(e.target);
//
//             const inputs = Object.fromEntries(form.entries());
//
//             const {data} = await axios.post('login', inputs, {
//                 withCredentials: true
//             });
//
//             axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
//
//             this.setToken(`Bearer ${data.token}`);
//
//             await this.$router.push({ name: 'home' });
//         }
//     },
//     beforeCreate() {
//         const submit = async e => {
//             const form = new FormData(e.target);
//             console.log(form)
//
//             const inputs = Object.fromEntries(form.entries());
//
//             const {data} = await axios.post('login', inputs, {
//                 withCredentials: true
//             });
//
//             axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
//
//             await router.push('/');
//         }
//         return {
//             submit
//         }
//     }
// }
</script>
