export default {
  name: 'views-search',
  methods: {
    // return the size in bytes currently stored in local storage
    totalSizeofAllStorage () {
      let size = 0
      let key
      for (let i = 0; i <= window.localStorage.length - 1; i++) {
        key = window.localStorage.key(i)
        size += this._lengthInUtf8Bytes(window.localStorage.getItem(key))
      }
      return this._format(size)
    },
    _lengthInUtf8Bytes (str) {
      // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
      let m = encodeURIComponent(str).match(/%[89ABab]/g)
      return str.length + (m ? m.length : 0)
    },
    _format (size) {
      return `Approximately ${size / 1000} KB (${size / 1000000} MB)`
    }
  }
}
