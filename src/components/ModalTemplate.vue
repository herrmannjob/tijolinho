<script>
import ResponseModal from "@/components/ResponseModal.vue";
import reforma from "../functions/templates/reforma.json";
import reforma_zero from "../functions/templates/reforma_zero.json";
export default {
  name: "ModalTemplate",
  components: { ResponseModal },
  props: {
    formTemplate: Boolean,
    user: String,
    cronograma_obra: String,
    tasks: Array,
    task_names: Array,
  },
  data: () => ({
    formTask: false,
    formTemplate: false,
    modal: false,
    message: { title: "", code: "", text: "" },
    allCheck: false,
    selected: [],
    renovation: reforma,
    renovation_zero: reforma_zero,
    renovation_seleceted: [],
    renovation_results: [],
    items_renovation_type: ["Reforma", "Reforma Zero"],
  }),
  methods: {
    handleClose() {
      this.$emit("update:formTemplate", false);
    },
    getTemplate(template) {
      console.log("error: ", template);
      var _json;
      if (template == "Reforma") {
        _json = reforma;
        this.renovation_results = reforma;
      }
      if (template == "Reforma Zero") {
        _json = reforma_zero;
        this.renovation_results = reforma_zero;
      }
      return _json;
    },
  },
};
</script>
<template>
  <vs-dialog
    @close="handleClose"
    blur
    v-model="formTemplate"
    max-width="800px"
    prevent-close
  >
    <template #header>
      <h3>
        Adicionar Tarefa
      </h3>
    </template>
    <h6>
      Escolha o tipo de reforma
    </h6>
    <v-select
      :items="items_renovation_type"
      v-model="renovation_seleceted"
      :onselect="getTemplate(renovation_seleceted)"
      label="Selecione"
    ></v-select>
    <div class="con-content row" style="margin-top: 2em">
      <vs-table v-model="selected">
        <template #thead>
          <vs-tr>
            <vs-th>
              <vs-checkbox
                :indeterminate="selected.length == renovation_results.length"
                v-model="allCheck"
                @change="selected = $vs.checkAll(selected, renovation_results)"
              />
            </vs-th>
            <vs-th>
              Nome da Tarefa
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
            :key="i"
            v-for="(tr, i) in renovation_results"
            :data="tr"
            :is-selected="!!selected.includes(tr)"
          >
            <vs-td checkbox>
              <vs-checkbox :val="tr" v-model="selected" />
            </vs-td>
            <vs-td>
              FACHADA
            </vs-td>
            <template #expand>
              <div class="con-content">
                <div>
                  <vs-avatar>
                    <img :src="`/avatars/avatar-${i + 1}.png`" alt="" />
                  </vs-avatar>
                  <p>
                    {{ tr.name }}
                  </p>
                </div>
                <div>
                  <vs-button flat icon>
                    <i class="bx bx-lock-open-alt"></i>
                  </vs-button>
                  <vs-button flat icon>
                    Send Email
                  </vs-button>
                  <vs-button border danger>
                    Remove User
                  </vs-button>
                </div>
              </div>
            </template>
          </vs-tr>
        </template>
      </vs-table>
      <span class="data">
        <pre>
  {{ selected.length > 0 ? selected : "Selecione um ou mais itens da tabela" }}
        </pre>
      </span>
    </div>
    <ResponseModal :modal.sync="modal" :message="message" />
  </vs-dialog>
</template>
<style lang="css">
.con-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
