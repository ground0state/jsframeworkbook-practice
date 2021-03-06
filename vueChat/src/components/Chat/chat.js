import { mapGetters, mapActions } from "vuex";
import { GET_CHANNELS } from "../../store/mutation-types";
import MessageList from "../MessageList";

export default {
  name: "chat",
  components: {
    "message-list": MessageList
  },
  computed: {
    ...mapGetters(["messages", "channels"])
  },
  methods: {
    ...mapActions([GET_CHANNELS, "GET_MESSAGES", "POST_MESSAGES"]),
    send_message() {
      this.POST_MESSAGES({
        cname: this.$route.params.cname,
        message: this.message
      });
      this.message = "";
    }
  },
  mounted() {
    this.GET_CHANNELS();
    this.GET_MESSAGES(this.$route.params.cname);
  },
  beforeRouteUpdate(to, from, next) {
    this.GET_MESSAGES(to.params.cname);
    next();
  },
  data() {
    return {
      message: ""
    };
  }
};
