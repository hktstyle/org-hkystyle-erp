/**
 * Copyright © 2017 北京易酒批电子商务有限公司. All rights reserved.
 */
package org.hkystyle.erp.services;

import org.hkystyle.erp.domain.bs.ProductBS;
import org.hkystyle.erp.domain.converter.product.ProductPOConverter;
import org.hkystyle.erp.domain.models.page.PageList;
import org.hkystyle.erp.domain.models.product.Product;
import org.hkystyle.erp.domain.models.product.dto.ListProductDTO;
import org.hkystyle.erp.domain.po.ProductPO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 产品
 * Created by hukaiyang on 2017/10/15.
 */

@Service
public class ProductService {
    @Autowired
    private ProductBS productBS;

    /**
     * 新增产品
     * @param product 产品信息
     */
    public Integer insert(final Product product) {
        return productBS.insertProduct(product);
    }

    public PageList<Product> listProduct(final ListProductDTO listProductDTO) {
        return productBS.listProduct(listProductDTO);
    }

    public void update(final Product product) {
        productBS.update(product);
    }
}
