<script setup>
import InputComponent from "src/components/InputComponent.vue";
import ModalComponent from "src/components/ModalComponent.vue";
import { useDynamicStore } from "src/stores/DynamicStore";
import { ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";

const dynamic = useDynamicStore();
const router = useRouter();
const step = ref(1);

const formData = ref({
  name: "",
  middlename: "",
  cpf: "",
  street: "",
  number: "",
  cep: "",
  email: "",
  birthDate: "",
  phone: "",
  neighborhoods: "",
});

const rules = reactive({
  name: [
    (val) => !!val || "Campo obrigatório",
    (val) =>
      /^[A-Za-z ]+$/.test(val.trim()) ||
      "Apenas letras e espaços são permitidos",
  ],

  middlename: [
    (val) => !!val || "Campo obrigatório",
    (val) =>
      /^[A-Za-z ]+$/.test(val.trim()) ||
      "Apenas letras e espaços são permitidos",
  ],

  cpf: [
    (val) => !!val || "CPF obrigatório",
    (val) =>
      (val && val.replace(/\D+/g, "").length === 11) ||
      "O CPF deve conter 11 números",
  ],

  numberStreet: [
    (val) => !!val || "Campo obrigatório",
    (val) =>
      /^\d{1,5}$/.test(val) ||
      "Apenas números são permitidos com até 5 digítos",
  ],

  cep: [
    (val) => !!val || "CEP obrigatório",
    (val) =>
      (val && val.replace(/\D+/g, "").length === 8) ||
      "O CEP deve conter 8 números",
  ],

  email: [
    (val) => !!val || "Campo obrigatório",
    (val) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) ||
      "Endereço de e-mail inválido",
  ],

  birthDate: [
    (val) => !!val || "Campo obrigatório",
    (val) =>
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19[4-9][5-9]|20[01][0-5])$/.test(
        val
      ) || "Data inválida. Use o formato DD/MM/AAAA com ano entre 1945 e 2005",
    (val) =>
      isValidDate(val) ||
      "Data inválida ou fora do intervalo permitido (1945-2005)",
  ],

  phone: [
    (val) =>
      (val && val.replace(/\D+/g, "").length === 11) ||
      "O número deve conter 11 números",
  ],
});

const modalText = reactive({
  textContent:
    "Seu cadastro foi concluído, parabéns! Aguarde o recebimento do e-mail para os próximos passos.",
  textConfirm: "Ok",
});

function goToStep(nextStep) {
  step.value = nextStep;
}

function goToPreviousStep() {
  if (step.value > 1) {
    step.value--;
  }
}

function handleSubmit() {
  dynamic.isOpen = true;
  const handle = formData;
  console.log(
    "DADOS QUE IRIA PARA O BACKEND, seria feito um tratamento para tirar espaços,pontos,traços e YYYY/MM/DD para date.",
    handle.value
  );
}

function backInitial() {
  router.back();
}

function isValidDate(dateString) {
  const parts = dateString.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if (year < 1945 || year > 2005 || month === 0 || month > 12) {
    return false;
  }

  const isLeap = new Date(year, 1, 29).getDate() === 29;
  const monthLength = [
    31,
    isLeap ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  return day > 0 && day <= monthLength[month - 1];
}

watch(
  () => formData.value.cep,
  (newValue) => {
    if (newValue.length === 9) {
      let formatValue = newValue.replace("-", "");

      dynamic.doGetCep(formatValue);

      if (dynamic.dataCep) {
        formData.value.street = dynamic.dataCep.logradouro;
        formData.value.neighborhoods = `${dynamic.dataCep.bairro} ${dynamic.dataCep.localidade}`;
      }
    }
  }
);

console.log(formData.value.phone.length);
</script>
<template>
  <div class="flex flex-center" style="height: 100vh">
    <q-card class="custom-card-size">
      <q-btn
        v-show="step === 1"
        flat
        round
        color="primary"
        icon="arrow_back_ios_new"
        @click="backInitial"
        class="q-mt-md q-ml-md"
      />
      <q-btn
        @click="goToPreviousStep"
        class="q-ml-md q-mt-md"
        v-show="step > 1"
        flat
        round
        color="primary"
        icon="arrow_back_ios_new"
        style="margin-top: 12px; margin-left: 12px"
      />
      <q-stepper v-model="step" animated>
        <!-- Etapa 1 -->
        <q-step :name="1" title="Dados Pessoais" :done="step > 1">
          <q-form @submit="goToStep(2)">
            <InputComponent
              v-model="formData.name"
              label="Nome"
              :rules="rules.name"
            />

            <InputComponent
              v-model="formData.middlename"
              label="Sobrenome"
              :rules="rules.middlename"
            />
            <InputComponent
              v-model="formData.cpf"
              mask="###.###.###-##"
              label="CPF"
              :rules="rules.cpf"
            />
            <q-stepper-navigation>
              <q-btn flat label="Continuar" type="submit" color="primary" />
            </q-stepper-navigation>
          </q-form>
        </q-step>
        <!-- Etapas 2 e 3 -->
        <q-step :name="2" title="Endereços" :done="step > 2">
          <q-form @submit="goToStep(3)">
            <InputComponent
              v-model="formData.cep"
              mask="#####-###"
              label="CEP"
              :rules="rules.cep"
            />
            <InputComponent
              v-model="formData.street"
              label="Nome da rua"
              :disabled="true"
            />
            <InputComponent
              v-model="formData.neighborhoods"
              label="Bairro"
              :disabled="true"
            />
            <InputComponent
              v-model="formData.number"
              label="Número da rua"
              :rules="rules.numberStreet"
            />

            <q-stepper-navigation>
              <q-btn flat label="Continuar" type="submit" color="primary" />
            </q-stepper-navigation>
          </q-form>
        </q-step>
        <q-step :name="3" title="Concluir" :done="step > 3">
          <q-form @submit="handleSubmit">
            <InputCom
              ponent
              v-model="formData.email"
              label="E-mail"
              :rules="rules.email"
            />
            <InputComponent
              v-model="formData.birthDate"
              mask="##/##/####"
              label="Data de nascimento"
              :rules="rules.birthDate"
            />
            <InputComponent
              v-model="formData.phone"
              mask="(##)9 ####-####"
              label="Número de telefone"
              :rules="rules.phone"
            />
            <q-stepper-navigation>
              <q-btn flat label="Continuar" type="submit" color="primary" />
            </q-stepper-navigation>
          </q-form>
        </q-step>
      </q-stepper>

      <ModalComponent
        :textContent="modalText.textContent"
        :textConfirm="modalText.textConfirm"
      />
    </q-card>
  </div>
</template>
<style scoped>
.custom-card-size {
  width: 80%;
  max-width: 600px;
  margin: auto;
}
</style>
