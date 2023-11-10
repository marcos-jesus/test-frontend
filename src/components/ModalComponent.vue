<template>
  <q-dialog v-model="dynamic.isOpen" persistent>
    <q-card>
      <q-card-section class="flex justify-center">
        <q-avatar icon="recommend" color="green" text-color="white" />
        <span class="q-ml-sm q-mt-md">{{ props.textContent }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          :label="props.textCancel ? props.textCancel : ''"
          color="primary"
          v-close-popup
        />
        <q-btn
          flat
          :label="textConfirm"
          color="primary"
          @click="redirect"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDynamicStore } from "src/stores/DynamicStore";
import { useRouter } from "vue-router";
const dynamic = useDynamicStore();
const router = useRouter();

const props = defineProps({
  icon: String,
  textContent: String,
  textConfirm: String,
  textCancel: String,
});

function redirect() {
  router.push({ path: "/" });
  dynamic.isOpen = false;
}
</script>
