<template>
  <!-- 注册框 -->
  <div>
    <div class="input-group login-input-style">
      <input type="text" class="form-control" placeholder="用户名" aria-describedby="basic-addon1" v-model="newUsername">
      <span class="input-group-addon" id="basic-addon3">@</span>
    </div>
    <div class="input-group login-input-style">
      <input type="password" class="form-control" placeholder="密码" aria-describedby="basic-addon2" v-model="newPassword">
      <span class="input-group-addon" id="basic-addon4">@</span>
    </div>
    <div class="login-input-style">
      <button type="button" class=" btn bg-primary" style="width: 260px">注册</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {

            }
        }
    }
</script>

<style scoped>

</style>
