export default function () {
  /* global process VERSION NODE_ENV */
  /* eslint no-undef: "error" */
  if (VERSION) {
    console.log(VERSION)
  }
  if (process.env) {
    console.log(process.env)
  }
  if (NODE_ENV) {
    console.log(NODE_ENV)
  }
}
