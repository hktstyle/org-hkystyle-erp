package org.hkystyle.erp.services;

import org.hkystyle.erp.common.utils.DateUtil;
import org.hkystyle.erp.domain.bs.ProductBS;
import org.hkystyle.erp.domain.converter.product.ProductPOConverter;
import org.hkystyle.erp.domain.models.page.PageList;
import org.hkystyle.erp.domain.models.product.Product;
import org.hkystyle.erp.domain.models.product.dto.ListProductDTO;
import org.hkystyle.erp.domain.models.product.enums.ProductState;
import org.hkystyle.erp.domain.po.ProductPO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 产品
 * Created by hukaiyang on 2017/10/15.
 */

@Service
public class ProductService {
    private static final Logger LOG = LoggerFactory.getLogger(ProductService.class);

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

    public Product getProduct(final Integer productId) {
        return productBS.getProduct(productId);
    }

    public void update(final Product product) {
        productBS.update(product);
    }

    public void disable(final Integer productId, final Integer userId) {
        final Product product = new Product();
        product.setId(productId);
        product.setState(ProductState.下架.ordinal());
        product.setLastUpdateUserId(userId);
        product.setLastUpdateTime(DateUtil.formatDatetime(DateUtil.now()));
        productBS.update(product);
    }
}
