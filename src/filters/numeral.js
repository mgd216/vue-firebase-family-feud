import Vue from 'vue'
import numeral from 'numeral'
import numFormat from 'vue-filter-number-format'

numeral.zeroFormat('-')
numeral.nullFormat('-')
numeral.locale('en')

Vue.filter('numFormat', numFormat(numeral))
