<template>
    <div class="purchase-page">
        <div class="title">
            <h1>申购功能示意</h1>
            <br><br>
        </div>
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
                    <h-select v-model="invester.bank_card" style="width:56vw;" @on-change="onchange">
                        <h-option v-for="item in invester.bank_card_List" :value="item.value" :key="item.value">{{ item.label }}</h-option>
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
                    <h-button type="primary"  @click="s_click = purchase('subcription')">认购</h-button>
                    <h-msg-box v-model="s_click" :escClose="true" title="确认申购吗？" @on-ok="handleSubmit()" @on-cancel="cancel" :beforeEscClose="beforetest"></h-msg-box>
                    <h-msg-box v-model="ss_click" width="360">
                        <p slot="header" style="color: #0a6; text-align: center;"><h-icon name="success"></h-icon><span>申购成功</span></p>
                        <div style="text-align: center;"><p>成交金额</p><p>清空信息重新申购</p></div>
                        <div slot="footer"><h-button type="success" size="large" long @click="ss_click = cancel()">确定</h-button></div>
                    </h-msg-box>
                    <h-msg-box v-model="sf_click1" width="360">
                        <p slot="header" style="color: #f60; text-align: center;"><h-icon name="warning"></h-icon><span>申购失败</span></p>
                        <div style="text-align: center;"><p>申购信息缺失</p></div>
                        <div slot="footer"><h-button type="error" size="large" long @click="sf_click1 = cancel()">取消</h-button></div>
                    </h-msg-box>
                    <h-msg-box v-model="sf_click2" width="360">
                        <p slot="header" style="color: #f60; text-align: center;"><h-icon name="warning"></h-icon><span>申购失败</span></p>
                        <div style="text-align: center;"><p>不满足申购条件</p></div>
                        <div slot="footer"><h-button type="error" size="large" long @click="sf_click2 = cancel()">取消</h-button></div>
                    </h-msg-box>
                </h-form-item>
            </h-form>
            <br><br>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
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
                bank_card_List: [],
            },
            totalNum: 0,
            rule_invester: {
                cer_number: [
                    { required: true, message: "请填写投资人证件号码", trigger: "blur" },
                    {
                        type: "string",
                        min: 5,
                        message: "身份证号长度不能小于5位",
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
                    { required: true, pattern: new RegExp(/^[1-9]\d*(?:\.\d*)?$/, "g"), message: "请填写认购金额", trigger: "blur" },
                ],
            },
            i_click: false,
            f_click: false,
            s_click: false,
            ss_click: false,
            sf_click1: false,
            sf_click2: false,
            findi: false,
            findf: false,
            finds: false,
        };
    },
    methods: {
        onclick() {
            //this.$hMessage.info("icon点击事件");
            //this.invester.cer_number = "";
            return "";
        },
        fetchInvester() {
            this.findi = false;
            //?cer_number=${this.invester.cer_number}
            //{params: {cer_number: "310101hhhhjjjjkkkk"}}
            return axios.get("http://127.0.0.1:9091/getInvester?cer_number="+this.invester.cer_number)
                .then((response) => {
                    console.log(response);
                    const {
                        data,
                        status,
                    } = response;
                    if(status !== 200 || response.data === ""){
                        this.findi = false;
                        return;
                    }
                    //JSON.parse
                    //JSON.stringify(data)转换json为字符串
                    //document.writeln(temp);
                    this.invester.user_name = data.userName;
                    this.invester.user_type = data.userType;
                    this.invester.cer_type = data.cerType;
                    this.invester.risk_grade = data.riskGrade;
                    console.log(this.invester);
                    this.findi = true;
                    return;
                })
                .catch((error) => {
                    console.log(error);
                    this.findi = false;
                    return;
                });
        },
        fetchBankCard() {
            return axios.get('http://127.0.0.1:9091/getBankCard/all?cer_number='+this.invester.cer_number)
                .then((response) => {
                    console.log(response);
                    if(response.status !== 200 || response.data === ""){
                        this.findi = false;
                        return;
                    }
                    this.invester.bank_card_List = response.data.map(item => ({
                        value: item.cardNumber,
                        label: item.cardNumber,
                        bank_name: item.bankName,
                        card_balance: item.balance,
                    }));
                    /*let i;
                    for(i = 0; i < response.length; i += 1){
                        let item = response.data[i];
                        this.invester.bank_card_List.push({value: item.cardNumber, label: item.cardNumber, bank_name: item.bankName, card_balance: item.balance,});
                    }*/
                    this.totalNum = this.invester.bank_card_List.length;
                    // Return the fetched data
                    //return this.invester.bank_card_List;
                    console.log(this.invester.bank_card_List);
                    return;
                })
                .catch((error) => {
                    console.log(error);
                    this.findi = false;
                    return;
                });
        },
        findi_Submit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$hMessage.success("提交成功!");
                    this.findi = false;
                    this.fetchInvester()
                    .then(() => this.fetchBankCard())
                    .then(() => {
                        if(this.findi){
                            //
                        } else {
                            this.i_click = true;
                            this.invester.cer_number = "";
                            this.invester.user_name = "";
                            this.invester.user_type = "";
                            this.invester.cer_type = "";
                            this.invester.risk_grade = "";
                            this.invester.bank_card = "";
                            this.invester.bank_card_List = [];
                            this.totalNum = 0;
                            this.bank_card.bank_card = "";
                            this.bank_card.bank_name = "";
                            this.bank_card.card_balance = "";
                        }
                    });
                } else {
                    this.$hMessage.error("表单验证失败!");
                }
            });
        },
        fetchProduct() {
            this.findf = false;
            return axios.get("http://127.0.0.1:9091/getProduct", {params: {fund_number: this.fund_product.fund_number}})
                .then((response) => {
                    console.log(response);
                    if(response.status !== 200 || response.data === ""){
                        this.findf = false;
                        return;
                    }
                    this.fund_product.fund_name = response.data.fundName;
                    this.fund_product.fund_type = response.data.fundType;
                    this.fund_product.fund_risk = response.data.fundRisk;
                    console.log(this.fund_product);
                    this.findf = true;
                    return;
                })
                .catch((error) => {
                    console.log(error);
                    this.findf = false;
                    return;
                });
        },
        findf_Submit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$hMessage.success("提交成功!");
                    this.fetchProduct()
                    .then(() => {
                        if(this.findf){
                            //
                        } else {
                            this.f_click = true;
                            this.fund_product.fund_name = "";
                            this.fund_product.fund_type = "";
                            this.fund_product.fund_risk = "";
                        }
                    });
                } else {
                    this.$hMessage.error("表单验证失败!");
                }
            });
        },
        onchange() {
            if(this.invester.bank_card !== "") {
                //this.$hMessage.success("提交成功!");
                this.bank_card.bank_card = this.invester.bank_card;
                let i = 0;
                for(; i < this.totalNum; i += 1) {
                    if(this.bank_card.bank_card === this.invester.bank_card_List[i].value) {
                        this.bank_card.bank_name = this.invester.bank_card_List[i].bank_name;
                        this.bank_card.card_balance = this.invester.bank_card_List[i].card_balance;
                        break;
                    }
                }
            } else {
                this.bank_card.bank_card = "";
                this.bank_card.bank_name = "";
                this.bank_card.card_balance = "";
            }
        },
        purchase(name) {
            this.finds = false;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$hMessage.success("提交成功!");
                    this.finds = true;
                } else {
                    this.$hMessage.error("表单验证失败!");
                    this.finds = false;
                }
            });
            return this.finds;
        },
        createSubscription() {
            //return axios.post("http://127.0.0.1:9091/createSubscription", {fund_number: this.subcription.fund_number, sub_card_number: this.subcription.bank_card, cer_number: this.subcription.cer_number, sub_amount: this.subcription.sub_amount})
            return axios.post("http://127.0.0.1:9091/createSubscription?fund_number=" + this.subcription.fund_number + "&sub_card_number=" + this.subcription.bank_card + "&cer_number=" + this.subcription.cer_number + "&sub_amount=" + this.subcription.sub_amount)
                .then((response) => {
                    console.log(response);
                    this.invester.cer_number = "";
                    this.invester.user_name = "";
                    this.invester.user_type = "";
                    this.invester.cer_type = "";
                    this.invester.risk_grade = "";
                    this.invester.bank_card = "";
                    this.invester.bank_card_List = [];
                    this.totalNum = 0;
                    this.bank_card.bank_card = "";
                    this.bank_card.bank_name = "";
                    this.bank_card.card_balance = "";
                    this.fund_product.fund_number = "";
                    this.fund_product.fund_name = "";
                    this.fund_product.fund_type = "";
                    this.fund_product.fund_risk = "";
                    this.subcription.fund_number = "";
                    this.subcription.bank_card = "";
                    this.subcription.cer_number = "";
                    this.subcription.sub_amount = "";
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        handleSubmit() {
            if(this.fund_product.fund_number && this.invester.cer_number && this.bank_card.bank_card && this.subcription.sub_amount) {
                this.subcription.fund_number = this.fund_product.fund_number;
                this.subcription.bank_card = this.bank_card.bank_card;
                this.subcription.cer_number = this.invester.cer_number;
                this.subcription.sub_amount = this.subcription.sub_amount;
                if(this.invester.risk_grade === this.fund_product.fund_risk && this.bank_card.card_balance > this.subcription.sub_amount){
                    this.ss_click = true;
                    this.createSubscription();
                } else {
                    this.sf_click2 = true;
                }
            } else {
                this.sf_click1 = true;
            }
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
    padding-top: 5%;
}
.title {
    width: 100%;
    text-align: center;
    padding-right: 10vw;
    padding-top: 0%;
}
</style>