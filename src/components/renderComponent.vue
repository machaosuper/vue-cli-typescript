<script lang="tsx">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class FilterItem extends Vue {
  render (h, context) {
    return (
      <div class="jsx">这条是jsx</div>
    )
  }
}
</script>
