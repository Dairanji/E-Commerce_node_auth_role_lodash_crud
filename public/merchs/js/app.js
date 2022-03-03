$(document).ready(function() {

    // for subcategory population
    $("#category").on("change", function() {
        // alert(this.value);
        const catID = this.value;
        let myHtmlCode = "";
        let myDefaultStyle = "<option disabled selected>Select Sub Category</option>";
        $('#subcategory').empty();
        // console.log(catID);
        $.ajax({
            url: "fetch-sub-category",
            type: "POST",
            data: {
                catID: catID
            },
            success: function(result) {
                console.log(result);
                $.each(result, function(key, value) {
                    console.log(key + " => " + value.subCategory);
                    myHtmlCode += '<option value="' + value._id + '">' + value.subCategory + '</option>';
                });
                $("#subcategory").append(myDefaultStyle + myHtmlCode);
            },
            error: function(err) {
                console.log(err);
            }
        })
    })

    //for product filter

    $(".subCategory").on("click", function(e) {
        e.preventDefault();
        $(".allproducts").hide();
        $(".filterproducts").empty();
        let myHtmlCode = "";
        let val = $(this).data("value");
        //alert(val);
        $.ajax({
            url: "fetch-product",
            type: "POST",
            data: {
                subCatId: val
            },
            success: function(result) {
                $.each(result, function(key, value) {
                    console.log(key + " => " + value.productName);
                    myHtmlCode += '<div class="col-lg-3 col-md-6 "><div class="single-product "> <a href="view-single-product/' + value._id + '"><img class="img-fluid productimg " src="uploads/' + value.image + '" alt=""></a> <div class = "product-details" > <h6>' + value.productName + '</h6> <div class = "price" ><h6>&#8377;' + value.price + '</h6><h6 class= "l-through" > &#8377;' + value.price + '</h6></div><div class= "prd-bottom" ><a href = "add-to-bag/' + value._id + '"' + 'class = "social-info" ><span class = "ti-bag" > </span> <p class = "hover-text" > add to bag </p></a></div> </div></div></div>';
                })
                $(".filterproducts").append(myHtmlCode);
            },
            error: function(err) {
                console.log(err);
            }
        })
    })





})