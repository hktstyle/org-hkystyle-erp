
package org.hkystyle.erp.domain.dao;

import org.hkystyle.erp.domain.models.product.dto.ListProductDTO;
import org.hkystyle.erp.domain.po.ProductPO;

import java.util.List;

/**
 * Created by hukaiyang on 2017/10/15.
 */
public interface ProductPOMapper {
    int insertProduct(ProductPO record);

    List<ProductPO> listProduct(ListProductDTO search);

    int listProductCount(ListProductDTO search);

    void update(ProductPO record);
}
