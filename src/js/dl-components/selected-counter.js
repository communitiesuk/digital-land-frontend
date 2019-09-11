import '../../govuk/vendor/polyfills/Function/prototype/bind';

// ================================
// Selected counts for filters
// ================================

function SelectedCounter($module) {
  this.$module = $module
  this.$fieldset = $module.querySelector("fieldset")
  this.$inputs = this.$fieldset.querySelectorAll("input")
}

SelectedCounter.prototype.init = function() {
  var $module = this.$module
  var $inputs = this.$inputs

  // if no inputs then return
  if (!$inputs) {
    return
  }

  //
  var boundFetchCountElement = this.fetchCountElement.bind(this)
  this.countMessage = boundFetchCountElement()

  // if current count is 0 hide the message
  this.message_is_hidden = false
  if(this.currentCount == 0) {
    this.hideCountMessage()
  }

  // Bind event changes to the textarea
  var boundChangeEvents = this.bindChangeEvents.bind(this)
  boundChangeEvents()
}

SelectedCounter.prototype.fetchCountElement = function() {
  var $module = this.$module
  var countMessage = $module.querySelector(".filter-group__selected-text")

  // if the count message doesn;t exist, create one
  if(!countMessage) {
    countMessage = this.createCountElement()
  }

  this.countElement = countMessage.querySelector(".filter-group__selected-text__count")
  this.currentCount = parseInt(this.countElement.textContent)

  return countMessage
}

SelectedCounter.prototype.createCountElement = function() {
  var $module = this.$module
  var $summary = $module.querySelector(".filter-group__summary");
  var firstIcon = $summary.querySelector("svg")

  var countMessage = document.createElement("span")
  countMessage.classList.add("filter-group__selected-text")
  countMessage.textContent = " selected"
  firstIcon.insertAdjacentElement('beforebegin', countMessage)

  countMessage.insertAdjacentHTML('afterbegin', '<span class="filter-group__selected-text__count">0</span>' )
  
  return countMessage
}

SelectedCounter.prototype.bindChangeEvents = function() {
  var $inputs = this.$inputs
  //console.log(this)
  $inputs.forEach(input => {
    input.addEventListener('change', this.updateCount.bind(this))
  })
}

SelectedCounter.prototype.updateCount = function() {
  var $fieldset = this.$fieldset
  var count = $fieldset.querySelectorAll("input:checked").length

  // if 0 hide
  if(count == 0) {
    this.countElement.textContent = 0
    this.hideCountMessage()
  } else if (count != this.currentCount) {
    // if changed update
    this.countElement.textContent = count
    this.showCountMessage()
  }
  // if same, do nothing ----
  
  this.currentCount = count
}

SelectedCounter.prototype.hideCountMessage = function() {
  this.countMessage.classList.add("govuk-visually-hidden")
  this.message_is_hidden = true
}

SelectedCounter.prototype.showCountMessage = function() {
  this.countMessage.classList.remove("govuk-visually-hidden")
  this.message_is_hidden = false
}

export default SelectedCounter