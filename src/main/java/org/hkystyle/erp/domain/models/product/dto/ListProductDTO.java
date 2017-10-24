/**
 * Copyright © 2017 hkystyle. All rights reserved.
 */
package org.hkystyle.erp.domain.models.product.dto;

import org.hkystyle.erp.domain.models.page.PagerDTO;

/**
 * Created by hukaiyang on 2017/10/15.
 */
public class ListProductDTO extends PagerDTO {
    /**
     * 产品名称
     */
    private String productName;

    /**
     * 状态
     */
    private Integer state;

    /**
     * 获取 产品名称
     */
    public String getProductName() {
        return this.productName;
    }

    /**
     * 设置 产品名称
     */
    public void setProductName(String productName) {
        this.productName = productName;
    }

    /**
     * 获取 状态
     */
    public Integer getState() {
        return this.state;
    }

    /**
     * 设置 状态
     */
    public void setState(Integer state) {
        this.state = state;
    }
}
