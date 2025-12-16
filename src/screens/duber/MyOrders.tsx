import React, { useCallback, useMemo, useState } from 'react';
import { View, TouchableOpacity, FlatList, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { makeStyles, Text, Overlay } from '@rneui/themed';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import OrderCard from '@/components/OrderCard';
import { OrderStatus } from '@/types/order';
import { BUD_ROUTES, BudStackParamList } from '@/types/routes';

type Order = {
    id: string;
    title: string;
    status: OrderStatus;
    date: string;
    loadSize: string;
    price: string;
};

type FilterOption = 'All Orders' | OrderStatus;

type NavigationProp = NativeStackNavigationProp<BudStackParamList>;

const MyOrders = () => {
  const styles = useStyles();
    const navigation = useNavigation<NavigationProp>();
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<FilterOption>('All Orders');

    const filterOptions: FilterOption[] = useMemo(
        () => [
            'All Orders',
            OrderStatus.REQUESTED,
            OrderStatus.ACCEPTED,
            OrderStatus.IN_PROGRESS,
            OrderStatus.COMPLETED,
            OrderStatus.REJECTED,
            OrderStatus.CANCELLED,
        ],
        [],
    );

    // Mock orders data - replace with actual data from API/store
    const allOrders: Order[] = useMemo(
        () => [
            {
                id: '1',
                title: 'Order #scrub-odr-q21bx87y',
                status: OrderStatus.REQUESTED,
                date: 'Jul 15, 2023',
                loadSize: '5',
                price: '$24.99',
            },
            {
                id: '2',
                title: 'Order #scrub-odr-q21bx87y',
                status: OrderStatus.ACCEPTED,
                date: 'Jul 15, 2023',
                loadSize: '5',
                price: '$24.99',
            },
            {
                id: '3',
                title: 'Order #scrub-odr-q21bx87y',
                status: OrderStatus.IN_PROGRESS,
                date: 'Jul 15, 2023',
                loadSize: '5',
                price: '$24.99',
            },
            {
                id: '4',
                title: 'Order #scrub-odr-q21bx87y',
                status: OrderStatus.COMPLETED,
                date: 'Jul 15, 2023',
                loadSize: '5',
                price: '$24.99',
            },
            {
                id: '5',
                title: 'Order #scrub-odr-q21bx89a',
                status: OrderStatus.CANCELLED,
                date: 'Jul 20, 2023',
                loadSize: '19',
                price: '$19.99',
            },
            {
                id: '6',
                title: 'Order #scrub-odr-q21bx89a',
                status: OrderStatus.REJECTED,
                date: 'Jul 20, 2023',
                loadSize: '19',
                price: '$19.99',
            },
        ],
        [],
    );

    // Filter orders based on selected filter
    const filteredOrders: Order[] = useMemo(() => {
        if (selectedFilter === 'All Orders') {
            return allOrders;
        }
        return allOrders.filter(order => order.status === selectedFilter);
    }, [selectedFilter, allOrders]);

    const keyExtractor = useCallback((item: Order) => item.id, []);

    const getItemLayout = useCallback(
        (_: ArrayLike<Order> | null | undefined, index: number) => ({
            length: verticalScale(160), // Approximate height of OrderCard + spacing
            offset: verticalScale(160) * index,
            index,
        }),
        [],
    );

    const handleFilterSelect = useCallback((filter: FilterOption) => {
        setSelectedFilter(filter);
        setIsFilterModalVisible(false);
    }, []);

    const handleViewDetails = useCallback(
        (orderId: string) => {
            navigation.navigate(BUD_ROUTES.ORDER_DETAIL, { orderId });
        },
        [navigation],
    );

    const renderItem: ListRenderItem<Order> = useCallback(
        ({ item }) => (
            <OrderCard
                title={item.title}
                status={item.status}
                date={item.date}
                loadSize={item.loadSize}
                price={item.price}
                primaryLabel="View Details"
              onPrimary={() => handleViewDetails(item.id)}
          />
      ),
      [handleViewDetails],
  );

    const renderFilterOption = useCallback(
        (option: FilterOption, index: number) => {
            const isSelected = selectedFilter === option;
            return (
                <TouchableOpacity
                    key={index}
                    style={[styles.filterOption, isSelected && styles.filterOptionSelected]}
                    onPress={() => handleFilterSelect(option)}>
                    <Text style={[styles.filterOptionText, isSelected && styles.filterOptionTextSelected]}>
                        {option}
                    </Text>
                </TouchableOpacity>
            );
        },
        [selectedFilter, handleFilterSelect, styles],
    );

    const ItemSeparator = useCallback(
        () => <View style={styles.separator} />,
        [styles.separator],
    );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
          <View style={styles.headerBar}>
              <Text style={styles.headerTitle}>My Orders</Text>
              <View style={styles.headerIcons}>
                  <TouchableOpacity style={styles.iconButton} />
                  <TouchableOpacity
                      style={styles.iconButton}
                      onPress={() => setIsFilterModalVisible(true)}>
                      <Ionicons
                          name="filter-outline"
                          size={moderateScale(20)}
                          color="#9CA3AF"
                      />
                  </TouchableOpacity>
              </View>
          </View>
          <FlatList
              data={filteredOrders}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              getItemLayout={getItemLayout}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={true}
              maxToRenderPerBatch={10}
              updateCellsBatchingPeriod={50}
              windowSize={10}
              initialNumToRender={6}
              ItemSeparatorComponent={ItemSeparator}
          />

          <Overlay
              isVisible={isFilterModalVisible}
              onBackdropPress={() => setIsFilterModalVisible(false)}
              overlayStyle={styles.modalOverlay}
              backdropStyle={styles.modalBackdrop}>
              <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>All Orders modal</Text>
                  <View style={styles.filterOptionsContainer}>
                      {filterOptions.map((option, index) => renderFilterOption(option, index))}
                  </View>
              </View>
          </Overlay>
    </SafeAreaView>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
        backgroundColor: theme.colors.background || '#F5F5F5',
    },
    headerBar: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: moderateScale(16),
        borderBottomRightRadius: moderateScale(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
        paddingTop: verticalScale(16),
        paddingBottom: verticalScale(16),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    headerTitle: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: '#111827',
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(16),
    },
    iconButton: {
        padding: moderateScale(4),
    },
    listContent: {
        paddingHorizontal: moderateScale(20),
        paddingTop: verticalScale(16),
        paddingBottom: verticalScale(24),
    },
    separator: {
        height: verticalScale(12),
    },
    modalBackdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalOverlay: {
        backgroundColor: 'transparent',
        width: '85%',
        maxWidth: moderateScale(400),
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(16),
        padding: moderateScale(20),
    },
    modalTitle: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: '#111827',
        marginBottom: verticalScale(16),
    },
    filterOptionsContainer: {
        gap: 0,
    },
    filterOption: {
        paddingVertical: verticalScale(14),
        paddingHorizontal: moderateScale(16),
        borderRadius: moderateScale(8),
        marginBottom: verticalScale(4),
    },
    filterOptionSelected: {
        backgroundColor: '#3B82F6',
    },
    filterOptionText: {
        fontSize: moderateScale(16),
        fontWeight: '400',
        color: '#111827',
    },
    filterOptionTextSelected: {
        color: '#FFFFFF',
    },
}));

export default MyOrders;

