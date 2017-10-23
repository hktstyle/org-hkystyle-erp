/**
 * Copyright © 2017 北京易酒批电子商务有限公司. All rights reserved.
 */
package org.hkystyle.erp.domain.bs;

import org.hkystyle.erp.domain.converter.product.ProductPOConverter;
import org.hkystyle.erp.domain.dao.ProductPOMapper;
import org.hkystyle.erp.domain.models.page.PageList;
import org.hkystyle.erp.domain.models.page.Pager;
import org.hkystyle.erp.domain.models.page.PagerCondition;
import org.hkystyle.erp.domain.models.product.Product;
import org.hkystyle.erp.domain.models.product.dto.ListProductDTO;
import org.hkystyle.erp.domain.po.ProductPO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by hukaiyang on 2017/10/15.
 */

@Service
public class ProductBS {
    @Autowired
    private ProductPOMapper productPOMapper;

    public int insertProduct(final Product product) {
        final ProductPO productPO = ProductPOConverter.convertToProductPO(product);
        productPOMapper.insertProduct(productPO);
        return productPO.getId();
    }

    public PageList<Product> listProduct(final ListProductDTO listProductDTO) {
        final int productCount = productPOMapper.listProductCount(listProductDTO);
        final PageList<Product> pageList = new PageList<>();
        final Pager pager = new Pager();
        pager.setRecordCount(productCount);
        if (0 < productCount) {
            final List<ProductPO> productPOList = productPOMapper.listProduct(listProductDTO);
            final List<Product> products = new ArrayList<>();
            productPOList.forEach(p -> products.add(ProductPOConverter.convertToProduct(p)));
            pageList.setDataList(products);
        }
        return pageList;
    }

    public void update(final Product product) {
        final ProductPO productPO = ProductPOConverter.convertToProductPO(product);
        productPOMapper.update(productPO);
    }
}
