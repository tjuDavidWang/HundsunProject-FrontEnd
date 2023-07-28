<template>
    <div class="purchase-page">
        <div>
            <h-form ref="invester" :model="invester" :rules="rule_invester" :label-width="100" inline>
                <h-form-item prop="cer_number" label="投资人查询">
                    <h-input v-model="invester.cer_number" size="large" icon="close" placeholder="请输入当前投资人证件号码"
                        style="width:56vw" @on-click="invester.cer_number = onclick()"></h-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <h-button type="primary" @click="findi_Submit('invester')">查询</h-button>
                    <!--h-msg-box v-model="i_click" :escClose="true" title="投资人查询失败" @on-ok="ok" @on-cancel="cancel" :beforeEscClose="beforetest"></h-msg-box-->
                    <h-msg-box v-model="i_click" width="360">
                        <p slot="header" style="color: #f60; text-align: center;"><h-icon name="warning"></h-icon><span>投资人查询失败</span></p>
                        <!--div style="text-align: center;"><p>此任务删除后，下游 10 个任务将无法执行。</p><p>是否继续删除？</p></div-->
                        <div slot="footer"><h-button type="error" size="large" long @click="i_click = cancel()">取消</h-button></div>
                    </h-msg-box>
                </h-form-item>

                <h-form-item prop="user_name" label="投资人名称">
                    <h-input v-model="invester.user_name" :readonly="true" size="large" style="width: 25vw;"></h-input>
                </h-form-item>
                <h-form-item prop="user_type" label="投资人类型">
                    <h-input v-model="invester.user_type" :readonly="true" size="large" style="width: 25vw;"></h-input>
                </h-form-item>

                <h-form-item prop="cer_type" label="投资人证件类型">
                    <h-input v-model="invester.cer_type" :readonly="true" size="large" style="width: 25vw;"></h-input>
                </h-form-item>
                <h-form-item prop="risk_grade" label="投资人风险等级">
                    <h-input v-model="invester.risk_grade" :readonly="true" size="large" style="width: 25vw;"></h-input>
                </h-form-item>

                <h-form-item prop="bank_card" label="银行卡选择">
                    <h-select v-model="invester.bank_card" style="width:56vw;">
                        <h-option v-for="item in invester.bank_card_List" :value="item.value" :key="item.value">{{
                            item.label }}</h-option>
                    </h-select>
                    <!--span class="demo-data">{{ invester.bank_card }}</span-->
                </h-form-item>
            </h-form>

            <h-form ref="bank_card" :model="bank_card" :label-width="100" inline>
                <h-form-item prop="bank_name" label="银行名称">
                    <h-input v-model="bank_card.bank_name" :readonly="true" size="large" style="width: 25vw;"></h-input>
                </h-form-item>
                <h-form-item prop="card_balance" label="余额">
                    <h-input v-model="bank_card.card_balance" :readonly="true" size="large" style="width: 25vw;"></h-input>
                </h-form-item>
            </h-form>

            <h-form ref="fund_product" :model="fund_product" :rules="rule_fund_product" :label-width="100" inline>
                <h-form-item prop="fund_number" label="基金代码">
                    <h-input v-model="fund_product.fund_number" size="large" icon="close" placeholder="请输入当前基金产品代码"
                        style="width:56vw;" @on-click="fund_product.fund_number = onclick()"></h-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <h-button type="primary" @click="findf_Submit('fund_product')">查询</h-button>
                    <h-msg-box v-model="f_click" width="360">
                        <p slot="header" style="color: #f60; text-align: center;"><h-icon name="warning"></h-icon><span>基金产品查询失败</span></p>
                        <div slot="footer"><h-button type="error" size="large" long @click="f_click = cancel()">取消</h-button></div>
                    </h-msg-box>
                </h-form-item>
                <h-form-item prop="fund_name" label="基金名称">
                    <h-input v-model="fund_product.fund_name" :readonly="true" size="large" style="width: 25vw;"></h-input>
                </h-form-item>
                <h-form-item prop="fund_type" label="基金类型">
                    <h-input v-model="fund_product.fund_type" :readonly="true" size="large" style="width: 25vw;"></h-input>
                </h-form-item>
                <h-form-item prop="fund_risk" label="基金风险等级">
                    <h-input v-model="fund_product.fund_risk" :readonly="true" size="large" style="width: 25vw;"></h-input>
                </h-form-item>
            </h-form>

            <h-form ref="subcription" :model="subcription" :rules="rule_subcription" :label-width="100" inline>
                <h-form-item prop="sub_amount" label="申购金额">
                    <h-input v-model="subcription.sub_amount" size="large" icon="close" placeholder="请输入当前银行卡对基金产品的认购金额"
                        style="width:56vw;" @on-click="subcription.sub_amount = onclick()"></h-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <h-button type="primary"  @click="s_click = true">认购</h-button>
                    <h-msg-box v-model="s_click" :escClose="true" title="确认申购吗？" @on-ok="handleSubmit('subcription')" @on-cancel="cancel" :beforeEscClose="beforetest"></h-msg-box>
                    <h-msg-box v-model="ss_click" width="360">
                        <p slot="header" style="color: #0a6; text-align: center;"><h-icon name="success"></h-icon><span>申购成功</span></p>
                        <div style="text-align: center;"><p>此任务删除后，下游 10 个任务将无法执行。</p><p>是否继续删除？</p></div>
                        <div slot="footer"><h-button type="success" size="large" long @click="ss_click = cancel()">确定</h-button></div>
                    </h-msg-box>
                    <h-msg-box v-model="sf_click" width="360">
                        <p slot="header" style="color: #f60; text-align: center;"><h-icon name="warning"></h-icon><span>申购失败</span></p>
                        <div style="text-align: center;"><p>此任务删除后，下游 10 个任务将无法执行。</p><p>是否继续删除？</p></div>
                        <div slot="footer"><h-button type="error" size="large" long @click="sf_click = cancel()">取消</h-button></div>
                    </h-msg-box>
                </h-form-item>
            </h-form>
        </div>
        <br><br>
    </div>
</template>
<script>
export default {
    data() {
        return {
            invester: {
                cer_number: "",
                user_name: "",
                user_type: "",
                cer_type: "",
                risk_grade: "",
                bank_card: "",
                bank_card_List: [
                    {
                        value: "beijing",
                        label: "北京市",
                    },
                    {
                        value: "shanghai",
                        label: "上海市",
                    },
                    {
                        value: "shenzhen",
                        label: "深圳市",
                    },
                    {
                        value: "hangzhou",
                        label: "杭州市",
                    },
                ],
            },
            rule_invester: {
                cer_number: [
                    { required: true, message: "请填写投资人证件号码", trigger: "blur" },
                    {
                        type: "string",
                        min: 18,
                        message: "身份证号长度不能小于18位",
                        trigger: "blur",
                    },
                    {
                        type: "string",
                        max: 18,
                        message: "身份证号长度不能大于18位",
                        trigger: "blur",
                    },
                ],
            },
            bank_card: {
                bank_card: "",
                bank_name: "",
                card_balance: "",
            },
            fund_product: {
                fund_number: "",
                fund_name: "",
                fund_type: "",
                fund_risk: "",
            },
            rule_fund_product: {
                fund_number: [
                    { required: true, message: "请填写基金产品代码", trigger: "blur" },
                ],
            },
            subcription: {
                cer_number: "",
                bank_card: "",
                fund_number: "",
                sub_amount: "",
            },
            rule_subcription: {
                sub_amount: [
                    { required: true, message: "请填写认购金额", trigger: "blur" },
                ],
            },
            i_click: false,
            f_click: false,
            s_click: false,
            ss_click: false,
            sf_click: false,
        };
    },
    methods: {
        onclick() {
            //this.$hMessage.info("icon点击事件");
            //this.invester.cer_number = "";
            return "";
        },
        findi_Submit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$hMessage.success("提交成功!");
                    this.i_click = true;
                    /*if(invester.cer_number){
                        a
                    } else {
                        b
                    }*/
                } else {
                    this.$hMessage.error("表单验证失败!");
                }
            });
        },
        findf_Submit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$hMessage.success("提交成功!");
                    this.f_click = true;
                    /*if(invester.cer_number){
                        a
                    } else {
                        b
                    }*/
                } else {
                    this.$hMessage.error("表单验证失败!");
                }
            });
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$hMessage.success("提交成功!");
                    this.ss_click = true;
                    /*if(invester.cer_number){
                        a
                    } else {
                        b
                    }*/
                } else {
                    this.$hMessage.error("表单验证失败!");
                }
            });
        },
        beforetest() {
            return true;
        },
        ok() {
            this.$hMessage.info("点击了确定");
        },
        cancel() {
            this.$hMessage.info("点击了取消");
            return false;
        },
        instance(type) {
            const title = "对话框的标题";
            const content = "<p>一些对话框内容</p><p>一些对话框内容</p>";
            this.$hMsgBox.success({
                title: title,
                content: content,
            });
            this.$hMsgBox.error({
                title: title,
                content: content,
            });
        },
    },
};
</script>
<style scoped>
#page-divider {
    margin-right: 0px;
    padding-right: 0;
    padding-left: 100px;
}

.purchase-page {
    width: 100%;
    padding-left: 5vw;
    padding-top: 10%;
}
</style>