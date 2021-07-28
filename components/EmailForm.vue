<template>
    <b-card :title="$t('emailValidation')"
            :sub-title="$t('withVuelidate')"
            class="shadow-lg text-center">

        <b-form @submit.stop.prevent="validateForm" class="pt-3">

            <b-form-group>

                <b-form-input v-model="email" type="text"
                              :state="emailErrors.length === 0 && email" trim
                              placeholder="adam.smith@example.com"
                              @input="$v.email.$touch()"/>

                <b-form-invalid-feedback>
                    {{ emailErrors[0] }}
                </b-form-invalid-feedback>

            </b-form-group>

            <b-button variant="primary" type="submit">
                {{$t('validateEmail')}}
            </b-button>

        </b-form>

    </b-card>
</template>

<script lang="ts">

import {Vue, Component} from "nuxt-property-decorator";
import {validationMixin} from "vuelidate";
import {required, email, minLength, maxLength} from "vuelidate/lib/validators";

@Component({
    mixins: [validationMixin],
    validations: {
        email: {
            required,
            email,
            minLength: minLength(5),
            maxLength: maxLength(100),
        }
    }
})

export default class EmailForm extends Vue {

    public email: any = null

    public get emailErrors() {

        const requiredField: any = this.$t('requiredField')
        const formatIsNotCorrect: any = this.$t('formatIsNotCorrect')
        const mustBeAtLeast: any = this.$t('mustBeAtLeast_', {n: 5})
        const mustBeAtMost: any = this.$t('mustBeAtMost_', {n: 5})

        const errors: string[] = [];
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.required && errors.push(requiredField);
        !this.$v.email.email && errors.push(formatIsNotCorrect);
        !this.$v.email.minLength && errors.push(mustBeAtLeast);
        !this.$v.email.maxLength && errors.push(mustBeAtMost);

        return errors
    }

    validateForm() {
        this.$v.email.$touch();

        if (!this.$v.email.$anyError) {
            this.$router.push(this.localePath('posts', this.$i18n.locale))
        }
    }
}

</script>
