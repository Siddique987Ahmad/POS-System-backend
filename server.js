const express=require('express')
const dotenv=require('dotenv').config()
const app=express()
const dbConnection=require('./DB/dbConnection')
const userRoute=require('./Routes/user.Route')
const supplierRoute=require('./Routes/supplier.Route')
const medicineRouter=require('./Routes/medicine.Route')
const inventoryRoute=require('./Routes/inventory.Route')
const batchRoute=require('./Routes/batch.Route')
const orderHistoryRoute=require('./Routes/orderHistory.Route')
const salesTransactionRoute=require('./Routes/salesTransaction.Route')
const paymentMethodRoute=require('./Routes/paymentMethod.Route')
const receiptRoute=require('./Routes/receipt.Route')
const taxRoute=require('./Routes/tax.Route')
const discountRoute=require('./Routes/discount.Route')
const refundRoute=require('./Routes/refund.Route')
const customerRoute=require('./Routes/customer.Route')
const medicalHistoryRoute=require('./Routes/medicalHistory.Route')
const doctorRoute=require('./Routes/doctor.Route')
const prescriptionRoute=require('./Routes/prescription.Route')
const salesReportRoute=require('./Routes/salesReport.Route')
const inventoryReportRoute=require('./Routes/inventoryReport.Route')
const financialReportRoute=require('./Routes/financialReportRoute')
const userActivityLogRoute=require('./Routes/userActivityLogRoute')
const purchaseOrderRoute=require('./Routes/purchaseOrder.Route')
const orderTrackingRoute=require('./Routes/orderTracking.Route')
const supplierInvoiceRoute=require('./Routes/supplierInvoice.Route')
const stockAlertRoute=require('./Routes/stockAlert.Route')
const salesAlertRoute=require('./Routes/salesAlert.Route')
const systemAlertRoute=require('./Routes/systemAlert.Route')
const transactionLogRoute=require('./Routes/transactionLog.Route')
const complianceReportRoute=require('./Routes/complianceReport.Route')
const dataRetentionPolicyRoute=require('./Routes/dataRetentionPolicy.Route')
dbConnection()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/user',userRoute)
app.use('/api/supplier',supplierRoute)
app.use('/api/medicine',medicineRouter)
app.use('/api/inventory',inventoryRoute)
app.use('/api/batch',batchRoute)
app.use('/api/orderhistory',orderHistoryRoute)
app.use('/api/salestransaction',salesTransactionRoute)
app.use('/api/paymentmethod',paymentMethodRoute)
app.use('/api/receipt',receiptRoute)
app.use('/api/tax',taxRoute)
app.use('/api/discount',discountRoute)
app.use('/api/refund',refundRoute)
app.use('/api/customer',customerRoute)
app.use('/api/medicalhistory',medicalHistoryRoute)
app.use('/api/doctor',doctorRoute)
app.use('/api/prescription',prescriptionRoute)
app.use('/api/salesreport',salesReportRoute)
app.use('/api/inventoryreport',inventoryReportRoute)
app.use('/api/financialreport',financialReportRoute)
app.use('/api/useractivitylog',userActivityLogRoute)
app.use('/api/purchaseorder',purchaseOrderRoute)
app.use('/api/ordertracking',orderTrackingRoute)
app.use('/api/supplierinvoice',supplierInvoiceRoute)
app.use('/api/stockalert',stockAlertRoute)
app.use('/api/salesalert',salesAlertRoute)
app.use('/api/systemalert',systemAlertRoute)
app.use('/api/transactionlog',transactionLogRoute)
app.use('/api/compliancereport',complianceReportRoute)
app.use('/api/dataretentionpolicy',dataRetentionPolicyRoute)

const port=process.env.PORT || 6000
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})