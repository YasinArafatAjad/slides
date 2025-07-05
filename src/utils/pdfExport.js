import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (data, filename) => {
  try {
    // Create a new jsPDF instance
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    // Add title and header
    pdf.setFontSize(24);
    pdf.setTextColor(220, 38, 38); // Red color
    pdf.text('Analytics Report', margin, 30);
    
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, 40);
    pdf.text(`Date Range: ${data.dateRange}`, margin, 47);
    pdf.text(`Status: ${data.isLive ? 'Live Data' : 'Fallback Data'}`, margin, 54);
    
    let yPosition = 70;
    
    // Add Key Metrics section
    if (data.keyMetrics) {
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Key Metrics', margin, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(10);
      pdf.setTextColor(60, 60, 60);
      
      const metrics = [
        ['Total Visitors', data.keyMetrics.totalVisitors, data.keyMetrics.changes?.visitors || 'N/A'],
        ['Page Views', data.keyMetrics.pageViews, data.keyMetrics.changes?.pageViews || 'N/A'],
        ['Avg. Session Duration', data.keyMetrics.avgSessionDuration, data.keyMetrics.changes?.duration || 'N/A'],
        ['Bounce Rate', data.keyMetrics.bounceRate, data.keyMetrics.changes?.bounceRate || 'N/A']
      ];
      
      // Create table for metrics
      const tableStartY = yPosition;
      const rowHeight = 8;
      const colWidths = [60, 40, 30];
      
      // Table headers
      pdf.setFontSize(9);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Metric', margin, tableStartY);
      pdf.text('Value', margin + colWidths[0], tableStartY);
      pdf.text('Change', margin + colWidths[0] + colWidths[1], tableStartY);
      
      yPosition = tableStartY + 5;
      
      metrics.forEach((metric, index) => {
        pdf.setTextColor(60, 60, 60);
        pdf.text(metric[0], margin, yPosition);
        pdf.text(metric[1], margin + colWidths[0], yPosition);
        
        // Color code the change
        const change = metric[2];
        if (change.startsWith('+')) {
          pdf.setTextColor(34, 197, 94); // Green
        } else if (change.startsWith('-')) {
          pdf.setTextColor(239, 68, 68); // Red
        } else {
          pdf.setTextColor(60, 60, 60); // Gray
        }
        pdf.text(change, margin + colWidths[0] + colWidths[1], yPosition);
        
        yPosition += rowHeight;
      });
      
      yPosition += 10;
    }
    
    // Add Visitor Trends section
    if (data.visitorTrends && data.visitorTrends.length > 0) {
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Visitor Trends', margin, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(9);
      pdf.setTextColor(60, 60, 60);
      
      data.visitorTrends.forEach((trend, index) => {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 30;
        }
        pdf.text(`${trend.name}: ${trend.value} visitors`, margin, yPosition);
        yPosition += 6;
      });
      
      yPosition += 10;
    }
    
    // Add Page Views section
    if (data.pageViews && data.pageViews.length > 0) {
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = 30;
      }
      
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Top Pages', margin, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(9);
      pdf.setTextColor(60, 60, 60);
      
      data.pageViews.forEach((page, index) => {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 30;
        }
        pdf.text(`${page.name}: ${page.value} views`, margin, yPosition);
        yPosition += 6;
      });
      
      yPosition += 10;
    }
    
    // Add Device Data section
    if (data.deviceData && data.deviceData.length > 0) {
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = 30;
      }
      
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Device Breakdown', margin, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(9);
      pdf.setTextColor(60, 60, 60);
      
      const totalDevices = data.deviceData.reduce((sum, device) => sum + device.value, 0);
      
      data.deviceData.forEach((device, index) => {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 30;
        }
        const percentage = ((device.value / totalDevices) * 100).toFixed(1);
        pdf.text(`${device.name}: ${device.value} (${percentage}%)`, margin, yPosition);
        yPosition += 6;
      });
      
      yPosition += 10;
    }
    
    // Add Traffic Sources section
    if (data.trafficSources && data.trafficSources.length > 0) {
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = 30;
      }
      
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Traffic Sources', margin, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(9);
      pdf.setTextColor(60, 60, 60);
      
      data.trafficSources.forEach((source, index) => {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 30;
        }
        pdf.text(`${source.name}: ${source.value}%`, margin, yPosition);
        yPosition += 6;
      });
      
      yPosition += 10;
    }
    
    // Add Real-time Activity section
    if (data.realtimeData && data.realtimeData.length > 0) {
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = 30;
      }
      
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Real-time Activity', margin, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(9);
      pdf.setTextColor(60, 60, 60);
      
      data.realtimeData.forEach((activity, index) => {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 30;
        }
        pdf.text(`${activity.page}: ${activity.visitors} visitors (${activity.time})`, margin, yPosition);
        yPosition += 6;
      });
    }
    
    // Add footer
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 30, pageHeight - 10);
      pdf.text('Generated by Analytics Dashboard', margin, pageHeight - 10);
    }
    
    // Save the PDF
    pdf.save(filename);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF report');
  }
};

// Alternative method using html2canvas for visual export
export const exportPageToPDF = async (elementId, filename) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }
    
    // Create canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;
    
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(filename);
    
  } catch (error) {
    console.error('Error generating visual PDF:', error);
    throw new Error('Failed to generate visual PDF report');
  }
};