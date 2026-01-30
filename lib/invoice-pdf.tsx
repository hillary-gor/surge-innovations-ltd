import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

export interface InvoicePDFProps {
  invoiceNum: string;
  date: string;
  status: 'paid' | 'pending' | 'overdue' | string;
  recipientName: string;
  recipientEmail: string;
  planName: string;
  amount: number;
  currency: string;
  billingCycle: string;
}

const styles = StyleSheet.create({
  page: { padding: 50, fontFamily: 'Helvetica', fontSize: 10, color: '#334155' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40, alignItems: 'flex-start' },
  logo: { width: 60, height: 60, marginBottom: 8 },
  companyName: { fontSize: 14, fontWeight: 'bold', color: '#0f172a', letterSpacing: 1 },
  companyDetail: { fontSize: 9, color: '#64748b', marginTop: 2 },
  
  statusBadge: {
    padding: '4 12',
    borderRadius: 4,
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
    textAlign: 'center'
  },
  statusPaid: { backgroundColor: '#dcfce7', color: '#166534' },
  statusPending: { backgroundColor: '#fee2e2', color: '#991b1b' },
  statusDefault: { backgroundColor: '#f1f5f9', color: '#475569' },

  invoiceTitle: { fontSize: 24, fontWeight: 'bold', color: '#0f172a', marginBottom: 4 },
  invoiceMeta: { alignItems: 'flex-end' },
  addressSection: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  addressLabel: { fontSize: 8, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 5, fontWeight: 'bold' },
  addressText: { fontSize: 10, color: '#1e293b', fontWeight: 'bold' },
  table: { marginTop: 10 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f8fafc', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', padding: '10 8' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', padding: '12 8', alignItems: 'center' },
  colDesc: { flex: 4 },
  colQty: { flex: 1, textAlign: 'center' },
  colPrice: { flex: 1, textAlign: 'right' },
  colTotal: { flex: 1, textAlign: 'right' },
  headerLabel: { fontSize: 8, fontWeight: 'bold', color: '#475569', textTransform: 'uppercase' },
  summaryContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 },
  summaryBox: { width: 200 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  grandTotalRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingTop: 8, marginTop: 8 },
  grandTotalText: { fontSize: 14, fontWeight: 'bold', color: '#0f172a' },
  paymentSection: { marginTop: 40, padding: 15, backgroundColor: '#f8fafc', borderRadius: 6 },
  paymentTitle: { fontSize: 10, fontWeight: 'bold', color: '#0f172a', marginBottom: 8 },
  mpesaRow: { flexDirection: 'row', marginBottom: 4, fontSize: 9 },
  mpesaLabel: { color: '#64748b', width: 80 },
  mpesaValue: { fontWeight: 'bold', color: '#059669' },
  footer: { position: 'absolute', bottom: 30, left: 50, right: 50, borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  socialHandle: { fontSize: 9, color: '#64748b' }
});

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-KE', { style: 'currency', currency: currency }).format(amount);
};

export const InvoicePDF = ({ 
  invoiceNum, date, status, recipientName, recipientEmail, planName, amount, currency, billingCycle 
}: InvoicePDFProps) => {
  
  const formattedPrice = formatCurrency(amount, currency);

  // Dynamic Status Logic
  const getStatusStyle = () => {
    switch(status.toLowerCase()) {
      case 'paid': return styles.statusPaid;
      case 'pending': return styles.statusPending;
      case 'unpaid': return styles.statusPending; 
      default: return styles.statusDefault;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image 
              style={styles.logo} 
              src="https://fmkjragqxbepihujxemw.supabase.co/storage/v1/object/public/logos/Surge%20No%20Bg%20Logo.png" 
            />
            <Text style={styles.companyName}>SURGE INNOVATIONS LTD</Text>
            <Text style={styles.companyDetail}>CBD, Nairobi, Kenya</Text>
            <Text style={styles.companyDetail}>info@surgeinnovations.org</Text>
          </View>
          
          <View style={styles.invoiceMeta}>
            <View style={[styles.statusBadge, getStatusStyle()]}>
              <Text>{status}</Text>
            </View>
            <Text style={styles.invoiceTitle}>Invoice</Text>
            <Text style={{ color: '#64748b' }}>#{invoiceNum}</Text>
            <Text style={styles.companyDetail}>Date: {date}</Text>
          </View>
        </View>

        {/* BILLING INFO */}
        <View style={styles.addressSection}>
          <View>
            <Text style={styles.addressLabel}>Bill To:</Text>
            <Text style={styles.addressText}>{recipientName}</Text>
            <Text style={styles.companyDetail}>{recipientEmail}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.addressLabel}>Payment Due:</Text>
            <Text style={styles.addressText}>Upon Receipt</Text>
          </View>
        </View>

        {/* TABLE */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.colDesc, styles.headerLabel]}>Description</Text>
            <Text style={[styles.colQty, styles.headerLabel]}>Qty</Text>
            <Text style={[styles.colPrice, styles.headerLabel]}>Price</Text>
            <Text style={[styles.colTotal, styles.headerLabel]}>Total</Text>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.colDesc}>
              <Text style={{ fontWeight: 'bold', color: '#1e293b' }}>{planName} Subscription</Text>
              <Text style={{ fontSize: 8, color: '#64748b', marginTop: 2 }}>Cycle: {billingCycle}</Text>
            </View>
            <Text style={styles.colQty}>1</Text>
            <Text style={styles.colPrice}>{formattedPrice}</Text>
            <Text style={styles.colTotal}>{formattedPrice}</Text>
          </View>
        </View>

        {/* TOTALS */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={{ color: '#64748b' }}>Subtotal</Text>
              <Text>{formattedPrice}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={{ color: '#64748b' }}>Tax (0%)</Text>
              <Text>{formatCurrency(0, currency)}</Text>
            </View>
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalText}>Amount Due</Text>
              <Text style={styles.grandTotalText}>{formattedPrice}</Text>
            </View>
          </View>
        </View>

        {/* PAYMENT INSTRUCTIONS */}
        <View style={styles.paymentSection}>
          <Text style={styles.paymentTitle}>How to Pay via M-PESA</Text>
          <View style={styles.mpesaRow}>
            <Text style={styles.mpesaLabel}>Business No:</Text>
            <Text style={styles.mpesaValue}>123456</Text>
          </View>
          <View style={styles.mpesaRow}>
            <Text style={styles.mpesaLabel}>Account No:</Text>
            <Text style={styles.mpesaValue}>{invoiceNum}</Text>
          </View>
          <Text style={{ fontSize: 8, color: '#94a3b8', marginTop: 8 }}>
            Please use the Invoice Number as the Account Number.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={{ fontSize: 8, color: '#94a3b8' }}>
            System generated. PDF Generated on {date}.
          </Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text style={styles.socialHandle}>Instagram: @surgeinnovationsltd</Text>
            <Text style={{ fontSize: 9, color: '#cbd5e1' }}>|</Text>
            <Text style={styles.socialHandle}>www.surgeinnovations.org</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};