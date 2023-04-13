const rules = {
    expense_title: new RegExp(/(^[a-zA-Z0-9\s]+$)/),
    expense_amount: new RegExp(/(^\d.+$)/),
    expense_category: new RegExp(/(^[a-zA-Z\s]+$)/),
    expense_file: new RegExp(/(^[a-zA-Z0-9\s_-]+)(.)(.jpg$|.jpeg$|.png$)/),
    expense_range: new RegExp(/(^all$|^daily$|^weekly$|^monthly$)/)
}

module.exports = rules;