<template>
    <div class="redeem-page">
        <div>
            <h-form ref="invester" :model="invester" :rules="rule_invester" :label-width="100" inline>
                <h-form-item prop="cer_number" label="投资人查询">
                    <h-input v-model="invester.cer_number" size="large" icon="close" placeholder="请输入当前投资人证件号码"
                        style="width:56vw" @on-click="invester.cer_number = onclick()"></h-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <h-button type="primary" @click="findi_Submit('invester')">查询</h-button>
                    <h-msg-box v-model="i_click" width="360">
                        <p slot="header" style="color: #f60; text-align: center;"><h-icon name="warning"></h-icon><span>投资人查询失败</span></p>
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
            <h-form ref="redemption" :model="redemption" :rules="rule_redemption" :label-width="100" inline>
                <h-form-item prop="red_share" label="赎回份额">
                    <h-input v-model="redemption.red_share" size="large" icon="close" placeholder="请输入当前银行卡对基金产品的赎回份额"
                        style="width:56vw;" @on-click="redemption.red_share = onclick()"></h-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <h-button type="primary"  @click="r_click = true">赎回</h-button>
                    <h-msg-box v-model="r_click" :escClose="true" title="确认赎回吗？" @on-ok="handleSubmit('redemption')" @on-cancel="cancel" :beforeEscClose="beforetest"></h-msg-box>
                    <h-msg-box v-model="rs_click" width="360">
                        <p slot="header" style="color: #0a6; text-align: center;"><h-icon name="success"></h-icon><span>赎回成功</span></p>
                        <div style="text-align: center;"><p>此任务删除后，下游 10 个任务将无法执行。</p><p>是否继续删除？</p></div>
                        <div slot="footer"><h-button type="success" size="large" long @click="rs_click = cancel()">确定</h-button></div>
                    </h-msg-box>
                    <h-msg-box v-model="rf_click" width="360">
                        <p slot="header" style="color: #f60; text-align: center;"><h-icon name="warning"></h-icon><span>赎回失败</span></p>
                        <div style="text-align: center;"><p>此任务删除后，下游 10 个任务将无法执行。</p><p>是否继续删除？</p></div>
                        <div slot="footer"><h-button type="error" size="large" long @click="rf_click = cancel()">取消</h-button></div>
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
            redemption: {
                cer_number: "",
                bank_card: "",
                fund_number: "",
                red_share: "",
            },
            rule_redemption: {
                red_share: [
                    { required: true, message: "请填写赎回份额", trigger: "blur" },
                ],
            },
            i_click: false,
            f_click: false,
            r_click: false,
            rs_click: false,
            rf_click: false,
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
                    this.rf_click = true;
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

.redeem-page {
    width: 100%;
    padding-left: 5vw;
    padding-top: 10%;
}
</style>