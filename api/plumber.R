#
# This is a Plumber API. You can run the API by clicking
# the 'Run API' button above.
#
# Find out more about building APIs with Plumber here:
#
#    https://www.rplumber.io/
#

library(plumber)
library(tidyverse)
library(gsheet)
library(svglite)

#* @apiTitle Plumber Example API
#* @apiDescription Plumber example description.


device_size <- function() {
  h_ <- 7
  w_ <- 7
  list(
    h = function() h_,
    w = function() w_,
    set_h = function(h) if (!is.null(h)) {h_ <<- as.numeric(h)},
    set_w = function(w) if (!is.null(w)) {w_ <<- as.numeric(w)}
  )
}

output_size <- device_size()

serializer_dynamic_svg <- function(..., type = "image/svg+xml") {
  serializer_device(
    type = type,
    dev_on = function(filename) {
      svglite::svglite(filename,
                       width = output_size$w(),
                       height = output_size$h())
    }
  )
}
register_serializer("svg", serializer_dynamic_svg)

#* @filter dynamic_size
function(req) {
  if (req$PATH_INFO == "/plot") {
    output_size$set_w(req$args$width)
    output_size$set_h(req$args$height)
  }
  plumber::forward()
}



#* Echo back the input
#* @param msg The message to echo
#* @get /echo
function(msg = "") {
  list(msg = paste0("The message is: '", msg, "'"))
}

#* Plot a histogram
#* @serializer svg
#* @get /plot
function() {
  df <- gsheet2tbl("https://docs.google.com/spreadsheets/d/1Elgbqzi_mKaeGjhw74pg2_5GMNUUm2Rn7bjTitIWclQ/edit?gid=2001371094#gid=2001371094")
  this_metric = "OncoMatch_distance_model_to_tumor"
  df <- df %>% dplyr::select(all_of(this_metric))
  colnames(df) <- "values"
  
  plt <- ggplot(df, aes(x=values))+
    geom_density(fill = "red")
  
  print(plt)
}

#* Return the sum of two numbers
#* @param a The first number to add
#* @param b The second number to add
#* @post /sum
function(a, b) {
  as.numeric(a) + as.numeric(b)
}

# Programmatically alter your API
#* @plumber
function(pr) {
  pr %>%
    # Overwrite the default serializer to return unboxed JSON
    pr_set_serializer(serializer_unboxed_json())
}
