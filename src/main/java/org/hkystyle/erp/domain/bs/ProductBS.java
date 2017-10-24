package org.hkystyle.erp.domain.bs;

import org.hkystyle.erp.common.utils.DateUtil;
import org.hkystyle.erp.domain.converter.product.ProductPOConverter;
import org.hkystyle.erp.domain.dao.ProductPOMapper;
import org.hkystyle.erp.domain.models.page.PageList;
import org.hkystyle.erp.domain.models.page.Pager;
import org.hkystyle.erp.domain.models.page.PagerCondition;
import org.hkystyle.erp.domain.models.product.Product;
import org.hkystyle.erp.domain.models.product.dto.ListProductDTO;
import org.hkystyle.erp.domain.models.product.enums.ProductState;
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
        if (null == productPO.getState()) {
            productPO.setState(ProductState.上架.ordinal());
        }
        productPO.setCreateTime(DateUtil.now());
        productPOMapper.insertProduct(productPO);
        return productPO.getId();
    }

    public PageList<Product> listProduct(final ListProductDTO listProductDTO) {
        final int productCount = productPOMapper.listProductCount(listProductDTO);
        final PageList<Product> pageList = new PageList<>();
        if (0 < productCount) {
            final List<ProductPO> productPOList = productPOMapper.listProduct(listProductDTO);
            final List<Product> products = new ArrayList<>();
            productPOList.forEach(p -> products.add(ProductPOConverter.convertToProduct(p)));
            pageList.setDataList(products);
        }
        pageList.setPager(new Pager(listProductDTO.getPageIndex(), listProductDTO.getPageSize(), productCount));
        return pageList;
    }

    public Product getProduct(final Integer productId) {
        final ProductPO productPO = productPOMapper.getProduct(productId);
        if (null == productPO) {
            return null;
        }
        return ProductPOConverter.convertToProduct(productPO);
    }

    public void update(final Product product) {
        final ProductPO productPO = ProductPOConverter.convertToProductPO(product);
        productPO.setLastUpdateTime(DateUtil.now());
        productPOMapper.update(productPO);
    }
}
