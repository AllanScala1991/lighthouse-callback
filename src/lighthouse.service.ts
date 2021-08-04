import PrinterService from './printer.service';

export class lighthouseCallback {
  constructor(itens) {
    this.getScorePoints(itens.lhr.categories);
    this.getAudits(itens.lhr.audits);
  }

  getScorePoints(obj) {
    const printer = new PrinterService();
    printer.group('SCORE POINTS', 1);
    Object.keys(obj).forEach((key) => {
      const scorePoints = this.convertScore(obj[key].score);
      const scoreFixed = parseInt(scorePoints.toFixed(0))
      printer.title(`${obj[key].title} - `);
      if (scoreFixed < 50) {
        printer.danger(scoreFixed, 1);
      } else if (scoreFixed >= 50 && scoreFixed < 90){
        printer.warning(scoreFixed, 1);
      } else {
        printer.success(scoreFixed, 1);
      }
    });
    printer.print();
  }

  getAudits(obj) {
    const printer = new PrinterService();
    printer.group('OPPORTUNITIES', 1);
    printer.title('Opportunity and diagnostics', 2);
    printer.print();
    Object.keys(obj).forEach((key) => {
      const scorePoints = this.convertScore(obj[key].score);
      if (scorePoints === 100 || scorePoints === 0) return;
      this.getOpportunities(obj[key]);
      this.getTables(obj[key]);
    });
  }

  getOpportunities(item) {
    const printer = new PrinterService();
    if (item?.details?.type !== 'opportunity') return;
    printer.warning(`OPPORTUNITY: ${item.title}`);
    printer.subtitle(` (${item.displayValue})`);
    printer.title(` - Time spent: `);
    printer.warning(`${this.convertTime(item.numericValue)} s`, 1);
    let items = item?.details?.items;
    if (Object.keys(items).length > 0) {
      printer.group(' - Sugestões: ', 1);
      Object.keys(items).forEach((item) => {
        let protocol = items[item]?.protocol ? `${items[item]?.protocol}: ` : '';
        let url = items[item]?.url ? `${items[item]?.url}: ` : '';
        if (protocol || url != '') printer.title(`   URL: ${protocol}${url}`, 1);
        if (items[item]?.wastedBytes) {
          printer.subtitle(`   Tamanho: ${this.convertSize(items[item].totalBytes)} Kb`, 1);
          printer.subtitle(`   Redução possível: `);
          printer.warning(`${this.convertSize(items[item].wastedBytes)} Kb`, 1);
        }
        if (items[item]?.wastedMs) {
          printer.subtitle(`   Redução possível: `);
          printer.warning(`${this.convertTime(items[item].wastedMs)} s`, 1);
        }
      });
    };
    printer.print();
  }

  getTables(item) {
    const printer = new PrinterService();
    if (item?.details?.type !== 'table') return;
    printer.warning(`TABLE: ${item.title}`);
    printer.subtitle(` (${item.displayValue})`);
    printer.title(` - Time spent: `);
    printer.warning(`${this.convertTime(item.numericValue)} s`, 1);
    let items = item?.details?.items;
    if (Object.keys(items).length > 0) {
      printer.group(' - Sugestões: ', 1);
      Object.keys(items).forEach((item) => {
        let protocol = items[item]?.protocol ? `${items[item]?.protocol}: ` : '';
        let url = items[item]?.url ? `${items[item]?.url}: ` : '';
        if (protocol || url != '') printer.title(`   URL: ${protocol}${url}`, 1);
        if (items[item]?.wastedBytes) {
          printer.subtitle(`   Tamanho: ${this.convertSize(items[item].totalBytes)} Kb`, 1);
          printer.subtitle(`   Redução possível: `);
          printer.warning(`${this.convertSize(items[item].wastedBytes)} Kb`, 1);
        }
        if (items[item]?.wastedMs) {
          printer.subtitle(`   Redução possível: `);
          printer.warning(`${this.convertTime(items[item].wastedMs)} s`, 1);
        }
      });
    };
    printer.print();
  }

  convertSize(size) {
    return (size/1024).toFixed(1);
  }

  convertTime(size) {
    return (size/1000).toFixed(2);
  }

  convertScore(val) {
    return val * 100;
  }
}