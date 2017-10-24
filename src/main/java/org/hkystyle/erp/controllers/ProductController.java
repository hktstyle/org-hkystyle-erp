package org.hkystyle.erp.controllers;

import org.hkystyle.erp.common.utils.AssertUtils;
import org.hkystyle.erp.domain.models.page.PageList;
import org.hkystyle.erp.domain.models.product.Product;
import org.hkystyle.erp.domain.models.product.dto.ListProductDTO;
import org.hkystyle.erp.results.BaseResult;
import org.hkystyle.erp.results.DataResult;
import org.hkystyle.erp.results.PageListResult;
import org.hkystyle.erp.results.SingleDataResult;
import org.hkystyle.erp.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by hukaiyang on 2017/10/23.
 */

@RestController
@RequestMapping(value = "/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @RequestMapping(value = "/listProduct", method = RequestMethod.POST)
    public PageListResult<Product> listProduct(@RequestBody ListProductDTO param) {
        final PageList<Product> pageList = productService.listProduct(param);
        final PageListResult<Product> result = new PageListResult<>();
        result.setDatas(pageList.getDataList());
        result.setTotalCount(pageList.getPager().getRecordCount());
        result.setTotalPage(pageList.getPager().getTotalPage());
        return result;
    }

    @RequestMapping(value = "/getProductDetail/{id}", method = RequestMethod.GET)
    public SingleDataResult<Product> getProductDetail(@PathVariable("id") Integer id) {
        AssertUtils.notNull(id, "产品Id不能为空~");
        final Product product = productService.getProduct(id);
        return new SingleDataResult<>(product);
    }

    @RequestMapping(value = "/changePrice/{operateUserId}", method = RequestMethod.POST)
    public BaseResult changePrice(@PathVariable("operateUserId") Integer userId, @RequestBody Product product) {
        productService.update(product);
        return new BaseResult();
    }

    @RequestMapping(value = "/disable/{operateUserId}", method = RequestMethod.POST)
    public BaseResult disable(@PathVariable("operateUserId") Integer userId, @RequestBody Integer productId) {
        AssertUtils.notNull(productId, "产品Id不能为空~");
        productService.disable(productId, userId);
        return new BaseResult();
    }
}
