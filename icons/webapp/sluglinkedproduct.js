/* stick this in wp-admin/edit-tag-form.php
<div id="slugLinkedProduct"><?php echo esc_attr( $slug ); ?></div><script type="text/javascript" src="/webapp/sluglinkedproduct.js"></script>
*/
var categorySlugsString=document.getElementById('slugLinkedProduct').innerHTML;
var serialForm='categorySlugsString='+categorySlugsString;

jQuery.post("/webapp/sluglinkedproduct.php", serialForm, function(data, textStatus) {
  console.log(data);
  document.getElementById('slugLinkedProduct').innerHTML=data.productSkus;
  }, "json");

document.getElementById('slugLinkedProduct').innerHTML="slug linked product";