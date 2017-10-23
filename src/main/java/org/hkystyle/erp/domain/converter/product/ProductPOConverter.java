
package org.hkystyle.erp.domain.converter.product;

import org.hkystyle.erp.common.utils.DateUtil;
import org.hkystyle.erp.domain.models.product.Product;
import org.hkystyle.erp.domain.po.ProductPO;

/**
 * Created by hukaiyang on 2017/10/15.
 */
public class ProductPOConverter {
    public static Product convertToProduct(final ProductPO model) {
        final Product product = new Product();
        product.setId(model.getId());
        product.setName(model.getName());
        product.setSellingUnit(model.getSellingUnit());
        product.setSellingPrice(model.getSellingPrice());
        product.setSpecName(model.getSpecName());
        product.setState(model.getState());
        product.setCreateTime(DateUtil.formatDatetime(model.getCreateTime()));
        product.setLastUpdateTime(DateUtil.formatDatetime(model.getLastUpdateTime()));
        product.setCreateUserId(model.getCreateUserId());
        product.setLastUpdateUserId(model.getLastUpdateUserId());
        return product;
    }

    public static ProductPO convertToProductPO(final Product model) {
        final ProductPO product = new ProductPO();
        product.setId(model.getId());
        product.setName(model.getName());
        product.setSellingUnit(model.getSellingUnit());
        product.setSellingPrice(model.getSellingPrice());
        product.setSpecName(model.getSpecName());
        product.setState(model.getState());
        product.setCreateTime(DateUtil.stringParseToDate(model.getCreateTime()));
        product.setLastUpdateTime(DateUtil.stringParseToDate(model.getLastUpdateTime()));
        product.setCreateUserId(model.getCreateUserId());
        product.setLastUpdateUserId(model.getLastUpdateUserId());
        return product;
    }
}
